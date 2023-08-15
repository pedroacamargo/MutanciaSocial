import { User } from "@/lib/interfaces/User.interface";
import { databases } from "@/lib/types/databases.types";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";


/**
 * @param uid - User which you would like to apply the action
 * @param currentUser - The current user (Stored in the 'authentication' database)
 */
export const useFollowers = (uid: string, currentUser: User) => {    
    const isFollowed = () => currentUser.following.some((uidFollowing) => uid === uidFollowing);



    const followPOST = async () => {
        const followRef = doc(db, databases.authDB, uid);
        const followSnapshot = await getDoc(followRef);
        const data = followSnapshot.data() as User;
        
        

        if (!isFollowed()) {

        }
    } 

    return { followPOST };
}