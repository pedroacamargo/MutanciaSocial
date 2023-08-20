import { getUserFromAuthDBWithUid } from "@/app/_components/auth/Auth.server";
import { User } from "@/lib/interfaces/User.interface";
import { databases } from "@/lib/types/databases.types";
import { db } from "@/utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";


/**
 * @param uid - User which you would like to apply the action
 * @param currentUser - The current user (Stored in the 'authentication' database)
 */
export const useFollowers =  (userProfile: User, currentUser: User | undefined) => {
    const [followData, setFollowData] = useState<{follow: boolean | undefined, followersAmount: number}>({ follow: undefined, followersAmount: userProfile.followersAmount});

    useEffect(() => {
        let obj = {...followData, follow: currentUser?.following.some((uidFollowing) => userProfile.uid === uidFollowing)}
        setFollowData(obj);
    }, [currentUser])

    const followPOST = async () => {        
        if (!followData.follow && currentUser) {
            const dataFollower = await getUserFromAuthDBWithUid(userProfile.uid) as User;
            const dataFollowing = await getUserFromAuthDBWithUid(currentUser.uid) as User;
            const newFollowersList = [...dataFollower.followers, dataFollowing.uid];
            const newFollowingList = [...dataFollowing.following, dataFollower.uid];
            await updateDoc(doc(db, databases.authDB, dataFollower.uid), { followers: newFollowersList, followersAmount: dataFollower.followersAmount + 1 });
            await updateDoc(doc(db, databases.authDB, dataFollowing.uid), { following: newFollowingList, followingAmount: dataFollowing.followingAmount + 1 });
            setFollowData({follow: true, followersAmount: followData.followersAmount + 1});
        }
    } 


    const followDELETE = async () => {
        if (followData.follow && currentUser) {
            // I'll need to take the data again to get the up to date data
            const dataFollower = await getUserFromAuthDBWithUid(userProfile.uid) as User;
            const dataFollowing = await getUserFromAuthDBWithUid(currentUser.uid) as User;
            const newFollowersList = dataFollower.followers.filter((uid) => uid != currentUser.uid);
            const newFollowingList = dataFollowing.following.filter((uid) => uid != userProfile.uid);
            await updateDoc(doc(db, databases.authDB, userProfile.uid), { followers: newFollowersList, followersAmount: dataFollower.followersAmount - 1 })
            await updateDoc(doc(db, databases.authDB, currentUser.uid), { following: newFollowingList, followingAmount: dataFollowing.followingAmount - 1 })

            setFollowData({follow: false, followersAmount: followData.followersAmount - 1});
        }
    }

    return { followPOST, followData, followDELETE };
}