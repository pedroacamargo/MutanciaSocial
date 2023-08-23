import { getUserFromAuthDBWithUid } from "@/app/_components/auth/Auth.server";
import { UserCookies } from "@/lib/interfaces/UserCredentials.interface";
import { fetchUserAsync } from "@/redux/user/user.action";
import { User } from "firebase/auth";
import { User as UserProfile } from "@/lib/interfaces/User.interface";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "@/utils/firebase";

export const useCurrentUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const dispatch = useDispatch();
    const [followingArray, setFollowingArray] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);


    
    useEffect(() => {
        const currentUser = Cookies.get('currentUser');

        if (currentUser) {
            const parsedJSON: UserCookies = JSON.parse(currentUser);
            setUser(parsedJSON.user)
        };
        
        dispatch(fetchUserAsync() as any);
    }, [dispatch]);
    
    useEffect(() => {
        const getFollowingArray = async () => {
            if (user) {
                setIsLoading(true);
                const dataFollowing = await getUserFromAuthDBWithUid(user.uid) as UserProfile;
                const arrayFollowing = [...dataFollowing.following];
                setFollowingArray(arrayFollowing);
                setIsLoading(false);
            }
        }

        getFollowingArray();
    }, [user]);

    return { user, setUser, followingArray, isLoading, setIsLoading };
}