'use client'
import { 
    ExploreContainer,
    SearchBar,
    SearchBarContainer,
    Bar,
    SearchBarHelper,
    SearchBarHelperState,
    ExploreRecommendedWarning,
    ExploreRecommendedContainer,
    ExploreRecommendedDivider,
} from "./explore.styles"
import { BsSearch } from "react-icons/bs"

import { ButtonInverted } from "../GlobalStyles.styles"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { DocumentData, collection, getDocs, limit, query, startAfter, where } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { databases } from "@/lib/types/databases.types";
import { User } from "@/lib/interfaces/User.interface";
import Spinner from "../_components/spinner/Spinner.component"
import Card from "../_components/explore/Card"

export default function Explore() {
    const [formInput, setFormInput] = useState("");
    const [usersFiltered, setUsersFiltered] = useState<User[]>([]);
    const [showHelper, setShowHelper] = useState(false);
    const [lastElementFromQueryForPagination, setLastElementFromQueryForPagination] = useState<DocumentData>();
    const [recommendedUsers, setRecommendedUsers] = useState<User[]>([]);
    const [recommendedIsLoading, setRecommendedIsLoading] = useState<boolean>(true)

    useEffect(() => {
        getRecommendedUsers();
    }, []);

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
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormInput(e.target.value);
        setShowHelper(true);
    }

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
                            <Card pagination={handlePagination} isLast={index === usersFiltered.length - 1} user={user} key={index}></Card>
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
                                        <Card customStyle="120%" user={user} key={index}></Card>
                                    )
                                })
                            }
                        </ExploreRecommendedContainer>
                    )
                }
        </ExploreContainer>
    )
}