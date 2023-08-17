'use client'
import { AccountStatusWrapper, FollowersStatus, PictureContainer, ProfileContainer, ProfileDashboardContainer, ProfilePicture, UserCardBio, UserCardStatusWrapper, UserCardWrapper, UserDisplayName, UserFirstName, UserStatusPinEmoji, UserStatusPinPop, UserStatusPinPopPhrase, PopUp, Status, ClosePopUp } from "@/app/profile/profile.styles";
import { auth, db, } from "@/utils/firebase";
import { User as UserProfile } from "@/lib/interfaces/User.interface";
import { BsPeopleFill } from "react-icons/bs";
import { BiSolidBarChartSquare } from "react-icons/bi";
import { ButtonBase, ButtonInverted } from "@/app/GlobalStyles.styles";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useFollowers } from "@/hooks/useFollowers";
import { collection, getDocs, query, where } from "firebase/firestore";
import { databases } from "@/lib/types/databases.types";
import PopUpUser from "./popupuser.component";

interface ProfileProps {
    params: { uid: string },
    userProfile: UserProfile,
    user: UserProfile,
    setForms: Dispatch<SetStateAction<{
        headerName: string;
        bio: string;
    }>>,
    editMode: boolean,
    setEditMode: Dispatch<SetStateAction<boolean>>,
}

interface PopUpData {
    type: 'Followers' | 'Following' | null,
    data: {
        followers: UserProfile[] | null,
        following: UserProfile[] | null,
    }
}

export default function Profile(props: ProfileProps) {
    const { params, userProfile, setForms, setEditMode, editMode, user } = props;
    const router = useRouter();
    const [disabled, setDisabled] = useState(false);
    const { followPOST, followData, followDELETE } = useFollowers(userProfile, user);
    const [popUp, setPopUp] = useState(false);
    const [popUpData, setPopUpData] = useState<PopUpData>({ type: null, data: { followers: null, following: null } })

    
    const handleEdit = () => {
        if (userProfile) {
            setEditMode(!editMode);
            setForms({
                headerName: userProfile.headerName || '',
                bio: userProfile.bio || '',
            })
        }
    }

    const handleFollow = async () => {
        setDisabled(true)
        await followPOST();
        setDisabled(false)
    }
    
    const handleUnfollow = async () => {
        setDisabled(true)
        await followDELETE();
        setDisabled(false)
    }

    const handlePopUp = () => {
        setPopUp(!popUp);
    }

    const getProfileFollowers = async () => {

        if (popUpData.data.followers) {
            setPopUpData({...popUpData, type: 'Followers'});
            console.log(popUpData);
        } else {
            const authRef = collection(db, databases.authDB);
            const q = query(authRef, where("following", "array-contains", userProfile.uid));
            const querySnapshot = await getDocs(q);
            let array: UserProfile[] = [];
            
            querySnapshot.docs.map((doc) => {
                array.push(doc.data() as UserProfile);
            })
            
            setPopUpData({ type: 'Followers', data: {...popUpData.data, followers: array } });
        }
        
        handlePopUp();
    }
    
    const getProfileFollowing = async () => {

        if (popUpData.data.following) {
            setPopUpData({...popUpData, type: 'Following'});
            console.log(popUpData);
        } else {        
            const authRef = collection(db, databases.authDB);
            const q = query(authRef, where("followers", "array-contains", userProfile.uid));
            const querySnapshot = await getDocs(q);
            let array: UserProfile[] = [];
            
            querySnapshot.docs.map((doc) => {
                array.push(doc.data() as UserProfile);
            })
            
            setPopUpData({ type: 'Following', data: {...popUpData.data, following: array} });
        }
        handlePopUp();
    }
    
    return (
        <ProfileContainer>
            <UserCardWrapper>
                <PictureContainer>
                
                    <ProfilePicture src={
                        `${params.uid == user?.uid ? auth.currentUser?.photoURL ? auth.currentUser.photoURL : '/Unknown_person.jpg'
                            : userProfile?.profilePic ? userProfile.profilePic : '/Unknown_person.jpg'}`
                    } />

                    <UserStatusPinPop>
                        <UserStatusPinEmoji> 🦍</UserStatusPinEmoji>
                        <UserStatusPinPopPhrase>Training</UserStatusPinPopPhrase>
                    </UserStatusPinPop>
                </PictureContainer>
                <UserCardStatusWrapper>
                    <UserFirstName>{userProfile?.headerName}</UserFirstName>

                    <UserDisplayName>@{userProfile?.displayName}</UserDisplayName>

                    {
                        userProfile?.bio ? <UserCardBio defaultValue={userProfile.bio as string} disabled></UserCardBio> : <></>
                    }

                    <AccountStatusWrapper>
                        <FollowersStatus><BsPeopleFill style={{marginBottom: '-2px'}}/> <strong> {followData.followersAmount} </strong> <Status onClick={getProfileFollowers}> Followers </Status> - <strong> {userProfile?.followingAmount} </strong> <Status onClick={getProfileFollowing}>Following</Status> </FollowersStatus>
                        <FollowersStatus><BiSolidBarChartSquare style={{marginBottom: '-2px'}}/> <strong>0</strong> Posts </FollowersStatus>
                    </AccountStatusWrapper>

                </UserCardStatusWrapper>
                
                {   
                    user ? (
                        userProfile?.uid == user?.uid ? <ButtonInverted style={{width: '70%'}} onClick={handleEdit}>Edit profile</ButtonInverted> : (
                            followData.follow ? <ButtonBase disabled={disabled} onClick={handleUnfollow} style={{width: '70%'}}>Unfollow</ButtonBase> : <ButtonBase style={{width: '70%'}} disabled={disabled} onClick={handleFollow}>Follow</ButtonBase>
                        )
                    ) : (
                        <ButtonBase onClick={() => router.push('/signin')} style={{width: '70%'}}>Sign in to follow</ButtonBase>
                    )

                }
            </UserCardWrapper>

            <ProfileDashboardContainer>
                Here will be the others status
            </ProfileDashboardContainer>


            {
                (popUp) && 
                    <PopUp style={{overflow: 'auto'}}>

                        <UserFirstName>{popUpData.type}</UserFirstName>

                        {
                            popUpData.type == 'Followers' ? (
                                popUpData.data.followers && popUpData.data.followers.map((user, index) => 

                                    <PopUpUser key={index} user={user}></PopUpUser> 

                            )) : (
                                popUpData.data.following && popUpData.data.following.map((user, index) => 
                                
                                    <PopUpUser key={index} user={user}></PopUpUser> 
                                    
                            ))
                        }

                        <ClosePopUp onClick={handlePopUp}>X</ClosePopUp>

                    </PopUp>
            }



        </ProfileContainer>
    )
}