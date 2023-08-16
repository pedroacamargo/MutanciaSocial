'use client'
import { AccountStatusWrapper, FollowersStatus, PictureContainer, ProfileContainer, ProfileDashboardContainer, ProfilePicture, UserCardBio, UserCardStatusWrapper, UserCardWrapper, UserDisplayName, UserFirstName, UserStatusPinEmoji, UserStatusPinPop, UserStatusPinPopPhrase } from "@/app/profile/profile.styles";
import { auth, } from "@/utils/firebase";
import { User as UserProfile } from "@/lib/interfaces/User.interface";
import { BsPeopleFill } from "react-icons/bs";
import { BiSolidBarChartSquare } from "react-icons/bi";
import { ButtonBase, ButtonInverted } from "@/app/GlobalStyles.styles";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFollowers } from "@/hooks/useFollowers";
import { getUserFromAuthDBWithUid } from "../auth/Auth.server";

interface ProfileProps {
    params: { uid: string },
    userProfile: UserProfile,
    setForms: Dispatch<SetStateAction<{
        headerName: string;
        bio: string;
    }>>,
    editMode: boolean,
    setEditMode: Dispatch<SetStateAction<boolean>>,
}
export default function Profile(props: ProfileProps) {
    const { params, userProfile, setForms, setEditMode, editMode } = props;
    const router = useRouter();
    const [user, setUser] = useState<UserProfile>()
    const { followPOST, followData, followDELETE } = useFollowers(userProfile, user);

    useEffect(() => {
        const getUser = async () => {
            if (auth.currentUser) {
                const currentUserProf = await getUserFromAuthDBWithUid(auth.currentUser?.uid) as UserProfile;
                setUser(currentUserProf);
            }
        }
        getUser();
    }, [])
    
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
        await followPOST();
    }

    const handleUnfollow = async () => {
        await followDELETE();
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
                        <FollowersStatus><BsPeopleFill style={{marginBottom: '-2px'}}/> <strong> {followData.followersAmount} </strong> Followers - <strong> {userProfile?.followingAmount} </strong> Following</FollowersStatus>
                        <FollowersStatus><BiSolidBarChartSquare style={{marginBottom: '-2px'}}/> <strong>0</strong> Posts </FollowersStatus>
                    </AccountStatusWrapper>

                </UserCardStatusWrapper>
                
                {   
                    user ? (
                        userProfile?.uid == user?.uid ? <ButtonInverted style={{width: '70%'}} onClick={handleEdit}>Edit profile</ButtonInverted> : (
                            followData.follow ? <ButtonBase onClick={handleUnfollow} style={{width: '70%'}}>Unfollow</ButtonBase> : <ButtonBase style={{width: '70%'}} onClick={handleFollow}>Follow</ButtonBase>
                        )
                    ) : (
                        <ButtonBase onClick={() => router.push('/signin')} style={{width: '70%'}}>Sign in to follow</ButtonBase>
                    )

                }
            </UserCardWrapper>

            <ProfileDashboardContainer>
                Here will be the others status
            </ProfileDashboardContainer>

        </ProfileContainer>
    )
}