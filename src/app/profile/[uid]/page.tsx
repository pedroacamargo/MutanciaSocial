'use client'
import { getUserFromAuthDBWithUid } from "@/app/_components/auth/Auth.server"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { User } from "@/lib/interfaces/User.interface";
import { useEffect, useState } from "react"
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
    ProfileDashboardContainer
} from "../profile.styles";
import { ButtonBase } from "@/app/GlobalStyles.styles";
import { BsPeopleFill } from "react-icons/bs";
import { BiSolidBarChartSquare } from "react-icons/bi";
import { auth } from "@/utils/firebase";
import { useSelector } from "react-redux";
import { selectUserIsLoading } from "@/redux/user/user.selector";
import Spinner from "@/app/_components/spinner/Spinner.component";

export default function Page({ params }: { params: { uid: string }}) {
    const [userProfile, setUserProfile] = useState<User | undefined>(undefined);
    const isUserLoading = useSelector(selectUserIsLoading);
    const profilePic = auth.currentUser?.photoURL ? auth.currentUser.photoURL : '/Unknown_person.png'

    useEffect(() => {
        const getUser = async () => {
            const user = await getUserFromAuthDBWithUid(params.uid) as User;
            setUserProfile(user);
        }
        getUser();
    }, [])

    console.log(userProfile)
    if (isUserLoading || userProfile == undefined) {
        return <Spinner></Spinner>
    }

    return (
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
                    <UserFirstName>Pedro Camargo</UserFirstName>
                    <UserDisplayName>@{userProfile?.displayName}</UserDisplayName>
                    <UserCardBio disabled>High performance water polo athlete | 🇵🇹 Guimarães - 🇧🇷 Rio de Janeiro</UserCardBio>
                    <AccountStatusWrapper>
                        <FollowersStatus><BsPeopleFill style={{marginBottom: '-2px'}}/> <strong>110</strong> Followers - <strong>1109</strong> Following</FollowersStatus>
                        <FollowersStatus><BiSolidBarChartSquare style={{marginBottom: '-2px'}}/> <strong>10</strong> Posts </FollowersStatus>
                    </AccountStatusWrapper>
                </UserCardStatusWrapper>
                <ButtonBase style={{width: '70%'}}>Follow</ButtonBase>
            </UserCardWrapper>

            <ProfileDashboardContainer>
                Here will be the others status
            </ProfileDashboardContainer>

        </ProfileContainer>
    )
}