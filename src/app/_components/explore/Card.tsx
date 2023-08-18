import { ExploreCardBio, ExploreCardContainer, ExploreCardProfilePicture, ExploreCardStatsContainer, ExploreCardStatsHeader, ExploreCardVisitButton } from "@/app/explore/explore.styles";
import { AccountStatusWrapper, FollowersStatus, UserDisplayName, UserFirstName } from "@/app/profile/profile.styles";
import { User } from "@/lib/interfaces/User.interface";
import { useEffect, useRef } from "react";
import { BiSolidBarChartSquare } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";

interface CardProps {
    user: User,
    isLast?: boolean,
    pagination?: () => Promise<void>
    customStyle?: string,
}

export default function Card(props: CardProps) {
    const { user, isLast, pagination, customStyle } = props;
    const cardRef = useRef(null);

    useEffect(() => {
        if (!cardRef?.current || !pagination) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (isLast && entry.isIntersecting) {
                pagination();
                observer.unobserve(entry.target);
            }
        })
        observer.observe(cardRef.current);
    }, [isLast]);

    return (
        <ExploreCardContainer ref={cardRef} style={{width: `${customStyle}`}}>

            <ExploreCardProfilePicture style={{backgroundColor: 'white'}} src={user.profilePic ? user.profilePic : '/Unknown_person.jpg' }></ExploreCardProfilePicture>

            <ExploreCardStatsContainer>
                <ExploreCardStatsHeader>
                    <UserFirstName style={{color: "whitesmoke", margin: "5px 5px 0 10px", fontWeight: "normal"}}>{user.headerName}</UserFirstName>
                    <UserDisplayName style={{color: "gray", transform: "translateY(5px)"}}> - @{user.displayName}</UserDisplayName>
                </ExploreCardStatsHeader>
                <ExploreCardBio>{user.bio}</ExploreCardBio>
                <AccountStatusWrapper style={{paddingLeft: "15px", position: "absolute", bottom: "10px", color: "white"}}>
                    <FollowersStatus><BsPeopleFill style={{marginBottom: '-2px'}}/> <strong> {user.followersAmount} </strong> Followers - <BiSolidBarChartSquare style={{marginBottom: '-2px', marginLeft: "-1px"}}/> <strong>0</strong> Posts  </FollowersStatus>
                </AccountStatusWrapper>

                <ExploreCardVisitButton href={`/profile/${user.uid}`}>See profile</ExploreCardVisitButton>

            </ExploreCardStatsContainer>


        </ExploreCardContainer>
    )
}