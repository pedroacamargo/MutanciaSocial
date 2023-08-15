'use client'
import { 
    ExploreContainer,
    SearchBar
} from "./explore.styles"

import { ButtonBase } from "../GlobalStyles.styles"
import { ChangeEvent, useState } from "react"
import { DocumentData, collection, getDocs, limit, query, startAfter, where } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { databases } from "@/lib/types/databases.types";
import { User } from "@/lib/interfaces/User.interface";
import Link from "next/link";

export default function Explore() {
    const [formInput, setFormInput] = useState("");
    const [usersFiltered, setUsersFiltered] = useState<User[]>([]);
    const [lastElementFromQueryForPagination, setLastElementFromQueryForPagination] = useState<DocumentData>();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormInput(e.target.value);
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
            <SearchBar onChange={handleChange}/>
            <ButtonBase onClick={handleSubmit}>Submit</ButtonBase>
            <div>
                {
                    usersFiltered.map((user) => {
                        return (
                            <div>
                                <Link href={`/profile/${user.uid}`}>{user.displayName}</Link>
                            </div>
                        )
                    })
                }
            </div>
            <ButtonBase onClick={handlePagination}>Paginate</ButtonBase>
        </ExploreContainer>
    )
}