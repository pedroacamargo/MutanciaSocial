import { fetchUserAsync, fetchUserFinished } from "@/redux/user/user.action";
import { User } from "firebase/auth";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useCurrentUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const dispatch = useDispatch();

    
    useEffect(() => {
        const currentUser = Cookies.get('currentUser');
        if (currentUser) {
            setUser(JSON.parse(currentUser))
        };

        dispatch(fetchUserAsync() as any);
    }, []);

    console.log(user);
    return { user, setUser };
}