'use client'
import { getUserFromAuthDBWithUid } from "@/app/_components/auth/Auth.server"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { User } from "@/lib/interfaces/User.interface";
import { ChangeEvent, useEffect, useState } from "react"
import {
    ProfileContainer,
    PictureContainer,
    UserCardWrapper,
    ProfilePicture,
    UserStatusPinPop,
    UserStatusPinPopPhrase,
    UserStatusPinEmoji,
    UserCardStatusWrapper,
    UserFirstName,
    UserDisplayName,
    UserCardBio,
    AccountStatusWrapper,
    FollowersStatus,
    ProfileDashboardContainer,
    EditProfileInputLabel,
    EditProfileName,
    EditProfileDisplayName
} from "../profile.styles";
import { ButtonBase, ButtonInverted } from "@/app/GlobalStyles.styles";
import { BsPeopleFill } from "react-icons/bs";
import { BiSolidBarChartSquare } from "react-icons/bi";
import { auth, db } from "@/utils/firebase";
import { useSelector } from "react-redux";
import { selectUserIsLoading } from "@/redux/user/user.selector";
import Spinner from "@/app/_components/spinner/Spinner.component";
import { doc, updateDoc } from "firebase/firestore";
import { databases } from "@/lib/types/databases.types";

export default function Page({ params }: { params: { uid: string }}) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<User | undefined>(undefined);
    const isUserLoading = useSelector(selectUserIsLoading);
    const [changed, setChanged] = useState(false); // check if some form changed, state used to optimize the usability
    const currentUser = useCurrentUser();
    const [forms, setForms] = useState({
        headerName: '',
        bio: '',
    });
    const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | null>();
    const profilePic = auth.currentUser?.photoURL ? auth.currentUser.photoURL : '/Unknown_person.jpg'

    useEffect(() => {
        const getUser = async () => {
            const user = await getUserFromAuthDBWithUid(params.uid) as User;
            setUserProfile(user);
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

    const handleSubmit = async () => {
        if (currentUser.user && changed) {
            const docRef = doc(db, databases.authDB, currentUser.user.uid);
            await updateDoc(docRef, {...forms});
            setEditMode(false);
            setChanged(false);
        } else {
            setEditMode(false);
        }
    }

    if (isUserLoading || userProfile == undefined) {
        return <Spinner></Spinner>
    }

    return (
        <>
            {!editMode ? (
                <ProfileContainer>
                    <UserCardWrapper>
                        <PictureContainer>
                            <ProfilePicture width={200} height={200} alt="Profile picture" src={profilePic} />
                            <UserStatusPinPop>
                                <UserStatusPinEmoji> 🦍</UserStatusPinEmoji>
                                <UserStatusPinPopPhrase>Training</UserStatusPinPopPhrase>
                            </UserStatusPinPop>
                        </PictureContainer>
                        <UserCardStatusWrapper>
                            <UserFirstName>{userProfile?.headerName}</UserFirstName>
        
                            <UserDisplayName>@{userProfile?.displayName}</UserDisplayName>
        
                            {
                                userProfile.bio ? <UserCardBio defaultValue={userProfile.bio as string} disabled></UserCardBio> : <></>
                            }
        
                            <AccountStatusWrapper>
                                <FollowersStatus><BsPeopleFill style={{marginBottom: '-2px'}}/> <strong> {userProfile.followersAmount} </strong> Followers - <strong> {userProfile.followingAmount} </strong> Following</FollowersStatus>
                                <FollowersStatus><BiSolidBarChartSquare style={{marginBottom: '-2px'}}/> <strong>0</strong> Posts </FollowersStatus>
                            </AccountStatusWrapper>
        
                        </UserCardStatusWrapper>
                        
                        {
                            userProfile.uid == currentUser.user?.uid ? <ButtonInverted style={{width: '70%'}} onClick={handleEdit}>Edit profile</ButtonInverted> : <ButtonBase style={{width: '70%'}}>Follow</ButtonBase>
        
                        }
                    </UserCardWrapper>
        
                    <ProfileDashboardContainer>
                        Here will be the others status
                    </ProfileDashboardContainer>
        
                </ProfileContainer>
            ) : (
                <ProfileContainer>
                    <UserCardWrapper>
                        <PictureContainer>
                            <ProfilePicture width={200} height={200} alt="Profile picture" src={profilePic} />
                            <UserStatusPinPop>
                                <UserStatusPinEmoji> 🦍</UserStatusPinEmoji>
                                <UserStatusPinPopPhrase>Training</UserStatusPinPopPhrase>
                            </UserStatusPinPop>
                        </PictureContainer>
                        <UserCardStatusWrapper>
                            <EditProfileInputLabel>Change profile Picture</EditProfileInputLabel>

                            <EditProfileInputLabel htmlFor="editName">Name</EditProfileInputLabel>
                            {
                                <EditProfileName id="editName" min={4} onChange={(e) => {setForms({...forms, headerName: e.target.value}); if (!changed) setChanged(true)}} type="text" placeholder="Your name..." value={forms.headerName}/>
                            }
        
                            <EditProfileInputLabel htmlFor="editUsername">Username</EditProfileInputLabel>
                            <EditProfileDisplayName id="editUsername" disabled value={`@${userProfile.displayName}`} />

                            <EditProfileInputLabel>Bio</EditProfileInputLabel>
                            <UserCardBio defaultValue={userProfile.bio as string} onChange={(e) => {setForms({...forms, bio: e.target.value}); if (!changed) setChanged(true)}} placeholder="Edit your bio..."></UserCardBio>
        
                        </UserCardStatusWrapper>
                        
                        <ButtonBase onClick={handleSubmit} style={{width: '100%'}}>Submit</ButtonBase>
                    </UserCardWrapper>
        
                    <ProfileDashboardContainer>
                        Here will be the others status
                    </ProfileDashboardContainer>
        
                </ProfileContainer>
            )
        }
        </>
    )
}