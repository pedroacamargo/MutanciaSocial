import { SignIn } from "@/app/_components/auth/signIn/SignIn.server"
import { fetchUserAsync, fetchUserFinished, fetchUserStart } from "@/redux/user/user.action";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { auth } from "@/utils/firebase";
import { SignUp } from "@/app/_components/auth/signUp/SignUp.server";
import { updateProfile } from "firebase/auth";
import { continueWithGoogle, getUserFromAuthDBWithUid } from "@/app/_components/auth/Auth.server";

export const useAuth = () => {
    const dispatch = useDispatch();
    
    const login = async (username: string, password: string) => {
        dispatch(fetchUserStart());
        const isLogged = await SignIn({username, password});

        if (isLogged && auth.currentUser?.uid) {
            const userDoc = await getUserFromAuthDBWithUid(auth.currentUser.uid);
            if (userDoc) {
                Cookies.set("currentUser", JSON.stringify({ user: auth.currentUser, acceptedConditions: userDoc.acceptedConditions }), { secure: true });
                return auth.currentUser
            }
        }

        dispatch(fetchUserFinished());
        return null;
    }

    const registerUser = async (username: string, email: string, password: string, confirmPassword: string) => {
        dispatch(fetchUserStart());
        try {
            const response = await SignUp({ username, email, password, confirmPassword });
            
            if (!response.emailError && !response.passwordError && !response.usernameError && auth.currentUser) {
                updateProfile(auth.currentUser, { displayName: username })
            } else {
                console.log("Sign Up failed :(");
            } 

            return {...response, generalError: false};
        } catch (err) {
            console.error(err);
            return {
                emailError: false,
                usernameError: false,
                passwordError: false,
                generalError: true,
            }
        }
    }

    const loginWithGoogle = async () => {
        dispatch(fetchUserStart());
        const user = await continueWithGoogle();
        
        if (user) {
            Cookies.set('currentUser', JSON.stringify(user), { secure: true });
            return true;
        }

        return false; 
    }
    
    return { login, loginWithGoogle ,registerUser };
}