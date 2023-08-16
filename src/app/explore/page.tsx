'use client'
import { 
    ExploreContainer,
    SearchBar,
    SearchBarContainer,
    Bar,
    SearchBarHelper,
    SearchBarHelperState,
    ExploreCardContainer,
    ExploreCardProfilePicture,
    ExploreCardStatsContainer,
    ExploreCardStatsHeader,
    ExploreCardBio,
    ExploreCardVisitButton,
    ExploreRecommendedWarning,
    ExploreRecommendedContainer,
    ExploreRecommendedDivider,
} from "./explore.styles"
import { BsPeopleFill, BsSearch } from "react-icons/bs"

import { ButtonBase, ButtonInverted } from "../GlobalStyles.styles"
import { ChangeEvent, useEffect, useState } from "react"
import { DocumentData, collection, getDocs, limit, query, startAfter, where } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { databases } from "@/lib/types/databases.types";
import { User } from "@/lib/interfaces/User.interface";
import { AccountStatusWrapper, FollowersStatus, UserDisplayName, UserFirstName } from "../profile/profile.styles"
import { BiSolidBarChartSquare } from "react-icons/bi"
import Spinner from "../_components/spinner/Spinner.component"

export default function Explore() {
    const [formInput, setFormInput] = useState("");
    const [usersFiltered, setUsersFiltered] = useState<User[]>([]);
    const [showHelper, setShowHelper] = useState(false);
    const [lastElementFromQueryForPagination, setLastElementFromQueryForPagination] = useState<DocumentData>();
    const [recommendedUsers, setRecommendedUsers] = useState<User[]>([]);
    const [recommendedIsLoading, setRecommendedIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const getRecommendedUsers = async () => {
            setRecommendedIsLoading(true)
            const q = query(collection(db, databases.authDB), where("admin", "==", true));
            const querySnapshot = await getDocs(q);
            let array: User[] = [];
            
            querySnapshot.docs.map((doc) => {
                array.push(doc.data() as User);            
            })
            
            setRecommendedUsers(array);
            setRecommendedIsLoading(false);
        }
        getRecommendedUsers();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormInput(e.target.value);
        setShowHelper(true);
    }

    const handleSubmit = async () => {
        const usersDBRef = collection(db, databases.authDB);
        const q = query(usersDBRef, where("displayName", ">=", formInput), limit(5));
        const querySnapshot = await getDocs(q);
        let array: User[] = [];

        querySnapshot.docs.map((doc) => {
            array.push(doc.data() as User);            
        })

        setLastElementFromQueryForPagination(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setUsersFiltered(array);
        console.table(usersFiltered)
    }

    const handlePagination = async () => {
        if (lastElementFromQueryForPagination) {
            const next = query(collection(db, databases.authDB), where("displayName", ">=", formInput), startAfter(lastElementFromQueryForPagination), limit(5));
            const querySnapshot = await getDocs(next);
            let array: User[] = usersFiltered;
            querySnapshot.docs.map((users) => {
                array.push(users.data() as User);
            })
            setLastElementFromQueryForPagination(querySnapshot.docs[querySnapshot.docs.length - 1]);
            setUsersFiltered(array);
            console.table(usersFiltered)        
        }
    }

    return (
        <ExploreContainer>
            <SearchBarContainer>
                <Bar onMouseLeave={() => setShowHelper(false)}>
                    <BsSearch style={{padding: '10px', backgroundColor: 'black', color: 'white', fontSize: '1.7em'}}/>
                    <SearchBar placeholder="Search for users..." onChange={handleChange}/>

                    {
                        showHelper &&
                            <SearchBarHelper>
                                <SearchBarHelperState onClick={handleSubmit}><BsSearch /> Users - <em> {formInput} </em></SearchBarHelperState>
                            </SearchBarHelper>    
                    }
                    <ButtonInverted style={{margin: '0', padding: '10px', borderRadius: '0 5px 0 0', borderLeft: 'none'}} onClick={handleSubmit}>Search</ButtonInverted>                    
                </Bar>
            </SearchBarContainer>
                {
                    usersFiltered.length > 0 ? usersFiltered.map((user, index) => {
                        return (
                            <ExploreCardContainer key={index}>

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
                    }) : recommendedIsLoading ? <Spinner></Spinner> : (
                        <ExploreRecommendedContainer>
                            <ExploreRecommendedWarning>It looks like you didn&apos;t search for any user <br /> Try searching for anyone or check recommended users</ExploreRecommendedWarning>
                            <ExploreRecommendedDivider>
                                Recommended Users
                            </ExploreRecommendedDivider>
                            {
                                recommendedUsers.map((user, index) => {
                                    return (
                                        <ExploreCardContainer key={index} style={{width: "120%"}}>

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
                                })
                            }
                        </ExploreRecommendedContainer>
                    )
                }
            <ButtonBase onClick={handlePagination}>Paginate</ButtonBase>
        </ExploreContainer>
    )
}