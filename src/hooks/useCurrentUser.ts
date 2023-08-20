import { UserCookies } from "@/lib/interfaces/UserCredentials.interface";
import { fetchUserAsync } from "@/redux/user/user.action";
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
            const parsedJSON: UserCookies = JSON.parse(currentUser);
            setUser(parsedJSON.user)
        };

        dispatch(fetchUserAsync() as any);
    }, [dispatch]);

    return { user, setUser };
}