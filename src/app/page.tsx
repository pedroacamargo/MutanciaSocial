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
import { useFollowers } from "@/hooks/useFollowers";
import { ExploreRecommendedDivider, ExploreRecommendedWarning } from "./explore/explore.styles";

export default function Dashboard() {
    const { user, followingArray, isLoading, setIsLoading } = useCurrentUser();
    const [isForYou, setIsForYou] = useState(true);
    const [postsData, setPostsData] = useState<PostsData[]>([]);
    const [followingPostsData, setFollowingPostsData] = useState<PostsData[]>([]);
    const [lastElementFromQueryForPagination, setLastElementFromQueryForPagination] = useState<{forYou: DocumentData | null, following: DocumentData | null}>({forYou: null, following: null});

    // console.log("Posts data:", postsData);
    // console.log("FollowingPosts data:", followingPostsData);
    // console.log(lastElementFromQueryForPagination);
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
            setIsLoading(true);
            if (isForYou) {
                const q = query(collection(db, databases.postsDB), orderBy("postDate", "desc"), limit(5));
                const querySnapshot = await getDocs(q);
                const postsArray = querySnapshot.docs.map((post) => {
                    console.log(post.data());
                    return post.data() as PostsData;
                })
                setLastElementFromQueryForPagination({...lastElementFromQueryForPagination, forYou: querySnapshot.docs[querySnapshot.docs.length - 1]});
                setPostsData(postsArray);
            } else if (!isForYou && followingArray.length > 0 && !isLoading){
                const q = query(collection(db,databases.postsDB), where('userRef', 'in', followingArray), orderBy("postDate", "desc"), limit(5));
                const querySnapshot = await getDocs(q);
                let array: PostsData[] = [];
                querySnapshot.docs.map((post) => {
                    array.push(post.data() as PostsData);
                    console.log(post.data());
                })
                setLastElementFromQueryForPagination({...lastElementFromQueryForPagination, following: querySnapshot.docs[querySnapshot.docs.length - 1]});
                setFollowingPostsData(array);
                console.log("HE9AUSHDUIASHDASÇPDJASDJASDSAD")
            } else {
                console.log('You do not follow anyone!');
                setLastElementFromQueryForPagination({...lastElementFromQueryForPagination, following: null});
                setFollowingPostsData([])
            }
            setIsLoading(false);
        }
        getPosts();
    }, [isForYou])
    
    const pagination = async () => {
        setIsLoading(true)
        if (isForYou) {
            if (lastElementFromQueryForPagination.forYou == undefined) return;
            const next = query(collection(db, databases.postsDB), orderBy("postDate", "desc"), startAfter(lastElementFromQueryForPagination.forYou), limit(5));
            const querySnapshot = await getDocs(next);
            let array: PostsData[] = postsData;
            querySnapshot.docs.map((post) => {
                array.push(post.data() as PostsData);
            })
            setLastElementFromQueryForPagination({...lastElementFromQueryForPagination, forYou: querySnapshot.docs[querySnapshot.docs.length - 1]});
            setPostsData(array);
        } else {
            if (lastElementFromQueryForPagination.following == undefined) return;
            const next = query(collection(db, databases.postsDB), where('userRef', 'in', followingArray), orderBy("postDate", "desc"), startAfter(lastElementFromQueryForPagination.following), limit(5));
            const querySnapshot = await getDocs(next);
            let array: PostsData[] = followingPostsData;
            querySnapshot.docs.map((post) => {
                array.push(post.data() as PostsData);
            })
            setLastElementFromQueryForPagination({...lastElementFromQueryForPagination, following: querySnapshot.docs[querySnapshot.docs.length - 1]});
            setFollowingPostsData(array);
        }
        setIsLoading(false)
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

                        {   (isForYou) &&
                            postsData.map((post, index) => {
                                return <Post key={index} isForYou={isForYou} user={user} post={post} islast={index === postsData.length - 1} paginate={pagination}/>
                            })
                        }

                        {
                            (!isForYou) &&
                            followingPostsData.map((post, index) => {
                                return <Post key={index} isForYou={isForYou} user={user} post={post} islast={index === followingPostsData.length - 1} paginate={pagination}/>
                            })

                        }

                        {
                            (!isForYou && followingPostsData.length == 0 && !isLoading) && (
                                <>
                                <ExploreRecommendedWarning>It looks like you are not following anyone yet.</ExploreRecommendedWarning>
                                <ExploreRecommendedWarning>Go to explore to find someone to follow!</ExploreRecommendedWarning>
                                <ExploreRecommendedDivider style={{width: '98.2%'}}></ExploreRecommendedDivider>
                                </>
                            )
                        }

                    </PostsContainer>


                </FeedContainer>
            </MainContainer>
        </>
    );
}