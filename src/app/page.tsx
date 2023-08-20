'use client'
import { Helmet } from "react-helmet-async";
import Navbar from "./_components/navbar/Navbar.component";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { DocumentData, collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter, updateDoc, where } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { databases } from "@/lib/types/databases.types";
import { User } from "@/lib/interfaces/User.interface";
import { 
    MainContainer,
    FeedContainer,
    PostsContainer,
    SelectBox,
    SelectBoxContainer,

} from "./_components/feed/home.styles";
import CreateNewPost from "./_components/feed/newpost.component";
import Post from "./_components/feed/post.component";
import { PostsData } from "@/lib/interfaces/PostsData.interface";
import { ButtonBase } from "./GlobalStyles.styles";

export default function Dashboard() {
    const { user } = useCurrentUser();
    const [isForYou, setIsForYou] = useState(false);
    const [postsData, setPostsData] = useState<PostsData[]>([]);
    const [lastElementFromQueryForPagination, setLastElementFromQueryForPagination] = useState<DocumentData>();

    // function to update old users that aren't registered with followers data
    useEffect(() => {
        const updateUsers = async () => {
            if (user) {
                const uid = user?.uid;
                const docRef = doc(db, databases.authDB, uid);
                const docSnap = (await getDoc(docRef)).data() as User;
                if (docSnap.followersAmount == null) {
                    await updateDoc(docRef, { followers: [], following: [], followersAmount: 0, followingAmount: 0 })
                }
            }
        }
        updateUsers();
    }, [user])

    useEffect(() => {
        const getPosts = async () => {
            const q = query(collection(db, databases.postsDB), orderBy("postDate", "desc"), limit(5));
            const querySnapshot = await getDocs(q);
            const postsArray = querySnapshot.docs.map((post) => {
                return post.data() as PostsData;
            })
            setLastElementFromQueryForPagination(querySnapshot.docs[querySnapshot.docs.length - 1]);
            setPostsData(postsArray);
        }
        getPosts();
    }, [])

    const pagination = async () => {
        const next = query(collection(db, databases.postsDB), orderBy("postDate", "desc"), startAfter(lastElementFromQueryForPagination), limit(5));
        const querySnapshot = await getDocs(next);
        let array: PostsData[] = postsData;
        querySnapshot.docs.map((post) => {
            array.push(post.data() as PostsData);
        })
        setLastElementFromQueryForPagination(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setPostsData(array);
    }

    return (
        <>
            <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Oswald:wght@400;500&family=Raleway:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet"/>
            </Helmet>
            <Navbar/>

            <MainContainer>
                

                <FeedContainer>

                    {user && <CreateNewPost user={user}/>}
                    
                    <SelectBoxContainer>
                        <SelectBox onClick={() => setIsForYou(true)} isselected={isForYou}> For You </SelectBox>
                        <SelectBox onClick={() => setIsForYou(false)} isselected={!isForYou}> Following </SelectBox>
                    </SelectBoxContainer>

                    <PostsContainer>

                        {
                            postsData.map((post, index) => {
                                return <Post key={index} user={user} post={post} islast={index === postsData.length - 1} paginate={pagination}/>
                            })
                        }

                    </PostsContainer>


                </FeedContainer>
            </MainContainer>
        </>
    );
}