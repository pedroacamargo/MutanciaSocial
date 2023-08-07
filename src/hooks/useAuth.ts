import { SignIn } from "@/app/_components/auth/signIn/SignIn.server"
import { fetchUserAsync, fetchUserFinished, fetchUserStart } from "@/redux/user/user.action";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { auth, db } from "@/utils/firebase";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { databases } from "@/lib/types/databases.types";
import { SignUp } from "@/app/_components/auth/signUp/SignUp.server";
import { updateProfile } from "firebase/auth";
import { User } from "@/lib/interfaces/User.interface";
import { continueWithGoogle } from "@/app/_components/auth/Auth.server";

export const useAuth = () => {
    const dispatch = useDispatch();
    
    const login = async (username: string, password: string) => {
        dispatch(fetchUserStart());
        const isLogged = await SignIn({username, password});

        const usersDBRef = collection(db, databases.authDB);
        const data = await getDocs(usersDBRef);
        const userDoc = data.docs.find((user) => {
            console.log('uid database: ',user.data().uid)
            console.log('auth.uid: ',auth.currentUser?.uid)
            return auth.currentUser && user.data().uid == auth.currentUser.uid
        })?.data() as User;

        if (isLogged) {
            dispatch(fetchUserAsync() as any);
            Cookies.set("currentUser", JSON.stringify({ user: auth.currentUser, acceptedConditions: userDoc.acceptedConditions }), { secure: true });
            return auth.currentUser
        }

        dispatch(fetchUserFinished());
        return null;
    }

    const registerUser = async (username: string, email: string, password: string, confirmPassword: string) => {
        dispatch(fetchUserStart());
        try {
            const response = await SignUp({ username, email, password, confirmPassword });
            
            if (response && auth.currentUser) {
                updateProfile(auth.currentUser, { displayName: username })
                dispatch(fetchUserAsync() as any);
            } else {
                console.log("Sign Up failed :(");
            } 

            return response;
        } catch (err) {
            console.error(err);
        }
    }

    const loginWithGoogle = async () => {
        dispatch(fetchUserStart());
        const user = await continueWithGoogle();
        
        if (user) {
            Cookies.set('currentUser', JSON.stringify(user.user), { secure: true });
        }

        dispatch(fetchUserFinished());
        return user ? true : false; 
    }
    
    return { login, loginWithGoogle ,registerUser };
}