import Cookies from "js-cookie";
import { User, signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useDispatch } from "react-redux";
import { fetchUserAsync } from "@/redux/user/user.action";

export const useSignOut = (setUser: (user: User | null) => void) => {    
    const dispatch = useDispatch();
    const signOutUser = async () => {
        Cookies.remove("currentUser");
        await signOut(auth);
        dispatch(fetchUserAsync() as any);
        setUser(null);
    }
    
    return { signOutUser };
}