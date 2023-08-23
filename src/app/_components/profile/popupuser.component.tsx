import { User } from "@/lib/interfaces/User.interface"
import { PopUpUserContainer } from "./popupuser.styles";
import { ExploreCardBio, ExploreCardContainer, ExploreCardProfilePicture, ExploreCardStatsContainer, ExploreCardStatsHeader, ExploreCardVisitButton, MobileExploreCardContainer } from "@/app/explore/explore.styles";
import { AccountStatusWrapper, FollowersStatus, UserDisplayName, UserFirstName } from "@/app/profile/profile.styles";
import { BsPeopleFill } from "react-icons/bs";
import { BiSolidBarChartSquare } from "react-icons/bi";
import { useEffect, useRef } from "react";

interface PopUpUserProps {
    user: User,
    isLast?: boolean,
    pagination?: () => Promise<void>
}

export default function PopUpUser(props: PopUpUserProps) {
    const { user, isLast, pagination } = props;
    const cardRef = useRef(null);
    const mobileRef = useRef(null);

    useEffect(() => {
        if (!cardRef?.current || !pagination) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (isLast && entry.isIntersecting) {
                pagination();
                observer.unobserve(entry.target);
            }
        })
        observer.observe(cardRef.current);
    }, [isLast, pagination]);

    useEffect(() => {
        if (!mobileRef?.current || !pagination) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (isLast && entry.isIntersecting) {
                pagination();
                observer.unobserve(entry.target);
            }
        })
        observer.observe(mobileRef.current);
    }, [isLast]);

    return (
    <>
        <ExploreCardContainer ref={cardRef} style={{width: "100%"}}>

            <ExploreCardProfilePicture style={{backgroundColor: 'white'}} src={user.profilePic ? user.profilePic : '/Unknown_person.jpg' }></ExploreCardProfilePicture>

            <ExploreCardStatsContainer>
                <ExploreCardStatsHeader>
                    <UserFirstName style={{color: "whitesmoke", margin: "5px 5px 0 10px", fontWeight: "normal", whiteSpace: 'nowrap'}}>{user.headerName}</UserFirstName>
                    <UserDisplayName style={{color: "gray", transform: "translateY(5px)", whiteSpace: 'nowrap'}}> - @{user.displayName}</UserDisplayName>
                </ExploreCardStatsHeader>
                <ExploreCardBio>{user.bio}</ExploreCardBio>
                <AccountStatusWrapper style={{paddingLeft: "15px", position: "absolute", bottom: "10px", color: "white"}}>
                    <FollowersStatus><BsPeopleFill style={{marginBottom: '-2px'}}/> <strong> {user.followersAmount} </strong> Followers - <BiSolidBarChartSquare style={{marginBottom: '-2px', marginLeft: "-1px"}}/> <strong>0</strong> Posts  </FollowersStatus>
                </AccountStatusWrapper>

                <ExploreCardVisitButton href={`/profile/${user.uid}`}>See profile</ExploreCardVisitButton>

            </ExploreCardStatsContainer>


        </ExploreCardContainer>
        <MobileExploreCardContainer ref={mobileRef} href={`/profile/${user.uid}`} style={{width: `100%`}}>
            <ExploreCardProfilePicture style={{backgroundColor: 'white', height: '100px', width: '100px'}} src={user.profilePic ? user.profilePic : '/Unknown_person.jpg' }></ExploreCardProfilePicture>

            <ExploreCardStatsContainer>
                <ExploreCardStatsHeader style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                    <UserFirstName style={{color: "whitesmoke", margin: "5px 5px 0 10px", fontWeight: "normal"}}>{user.headerName}</UserFirstName>
                    <UserDisplayName style={{color: "gray", transform: "translateY(5px)", margin: '-5px 0px 0 10px', fontSize: '.8em'}}>@{user.displayName}</UserDisplayName>
                </ExploreCardStatsHeader>
                <AccountStatusWrapper style={{paddingLeft: "15px", position: "absolute", bottom: "10px", color: "white"}}>
                    <FollowersStatus style={{marginLeft: '-5px', fontSize: '.8em'}}><BsPeopleFill style={{marginBottom: '-2px'}}/> <strong> {user.followersAmount} </strong> Followers - <BiSolidBarChartSquare style={{marginBottom: '-2px', marginLeft: "-1px"}}/> <strong> {user.posts ? user.posts.length : '0'} </strong></FollowersStatus>
                </AccountStatusWrapper>
            </ExploreCardStatsContainer>
        </MobileExploreCardContainer>
    </>
    )
}