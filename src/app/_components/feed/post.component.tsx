import { User } from "firebase/auth"
import { User as UserData } from "@/lib/interfaces/User.interface"
import { ProfilePic } from "../navbar/Navbar.styles"
import { Amount, CommentsContainer, CommentsTitle, CommentsWrapper, CreateNewPostInput, CreateNewPostInputButtonsContainer, CreateNewPostInputContainer, PostContainer, PostContent, PostHeader, PostHeaderName, PostHeaderPostTime, PostHeaderStats, PostLikesBarContainer, UserReplyContainer } from "./home.styles"
import { AiFillHeart } from "react-icons/ai"
import { BiSolidCommentDetail, BiSolidSend } from "react-icons/bi"
import Comment from "./comment.component"
import { ButtonInverted } from "@/app/GlobalStyles.styles"
import { useEffect, useRef, useState } from "react"
import { PostsData } from "@/lib/interfaces/PostsData.interface"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/utils/firebase"
import { databases } from "@/lib/types/databases.types"
import Spinner from "../spinner/Spinner.component"
import LoadingSpinner from "./LoadingSpinner.component"

interface PostProps {
    user: User | null,
    post: PostsData,
    islast?: boolean,
    paginate?: () => Promise<void>,
    isForYou: boolean,
}

interface PublishDate {
    value: number,
    scope: 'second' | 'minute' | 'hour' | 'day' | 'month',
}


export default function Post(props: PostProps) {
    const { user, post, islast, paginate,isForYou } = props;
    const [isOpened, setIsOpened] = useState(false);
    const [userData, setUserData] = useState<UserData>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [likesArray, setLikesArray] = useState(post.likesArray)
    const [publishDate, setPublishDate] = useState<PublishDate>({ value: 0, scope: 'second' });
    const [currentUserAlreadyLiked, setCurrentUserAlreadyLiked] = useState<boolean>(false)
    const [loadingLike, setLoadingLike] = useState<boolean>(false);
    const postRef = useRef(null);

    const calculatePublishData = () => {
        const offSet = new Date().getTimezoneOffset() ;
        const actualDate = new Date().getTime() + ((offSet / 1000) / 60);
        const postDate = post.postDate;
        console.log(actualDate)
        console.log(offSet * 60 * 1000)


        const secondsDiff = Math.floor((actualDate - postDate) / 1000);
        if (secondsDiff < 60) return setPublishDate({ value: secondsDiff, scope: 'second' });

        const minutesDiff = Math.floor((secondsDiff) / 60);
        if (minutesDiff < 60) return setPublishDate({ value: minutesDiff, scope: 'minute' });

        const hourDiff = Math.floor(minutesDiff / 60);
        if (hourDiff < 24) return setPublishDate({ value: hourDiff, scope: 'hour' });

        const daysDiff = Math.floor(hourDiff / 24);
        if (daysDiff < 30) return setPublishDate({ value: daysDiff, scope: 'day' });
        else return setPublishDate({ value: Math.floor(daysDiff / 30), scope: 'month' });
    }

    const checkIfIsLiked = () => {
        if (user) {
            const uid = user.uid;
            const response = likesArray.includes(uid);
            setCurrentUserAlreadyLiked(response);
        }
    }

    useEffect(() => {
        const getUserPostData = async () => {
            const postDoc = doc(db, databases.authDB, post.userRef);
            const postSnap = (await getDoc(postDoc)).data() as UserData;
            setUserData(postSnap);
            setIsLoading(false);
        }
        getUserPostData();
        checkIfIsLiked();
        calculatePublishData()
    }, [isForYou])
    
    const handleLike = async () => {
        if(loadingLike) return;
        setLoadingLike(true);
        const likesRef = doc(db, databases.postsDB, post.postId);
        if (!currentUserAlreadyLiked && user) {
            const newArray = [...likesArray, user.uid];
            await updateDoc(likesRef, { likes: newArray.length, likesArray: [...post.likesArray, user.uid] })
            
            setLikesArray(newArray);
            setCurrentUserAlreadyLiked(true);
        } else if (currentUserAlreadyLiked && user) {
            const newArray = likesArray.filter((element) => element != user.uid);
            await updateDoc(likesRef, { likes: newArray.length, likesArray: newArray })
            setLikesArray(newArray);
            setCurrentUserAlreadyLiked(false);
        }
        setLoadingLike(false);
    }

    const handleIsOpened = () => setIsOpened(!isOpened);

    useEffect(() => {
        if (!postRef?.current || !paginate) return; 
        const observer = new IntersectionObserver(([entry]) => {
            if (islast && entry.isIntersecting) {
                paginate();
                observer.unobserve(entry.target);
            }
        })
        observer.observe(postRef.current);
    }, [islast]);
    
    
    
    return (
        <PostContainer ref={postRef}>

        {
            (isLoading) ?
                <LoadingSpinner></LoadingSpinner>
            :
            <>
                <PostHeader>

                    <ProfilePic alt="Profile pic" src={`${isLoading ? '/Unknown_person.png' : userData?.profilePic}`} height={30} width={30}></ProfilePic>
                    <PostHeaderStats>
                        <PostHeaderName >{userData?.headerName ? userData.headerName : userData?.displayName}</PostHeaderName>
                        <PostHeaderPostTime>Published {publishDate.value} {
                            publishDate.value == 1 ? publishDate.scope : `${publishDate.scope}s`
                        } ago</PostHeaderPostTime>
                    </PostHeaderStats>
                </PostHeader>
                <PostContent>{post.content}</PostContent>
                <PostLikesBarContainer>

                    {
                        (user) ?                         
                                <>
                                    <AiFillHeart onClick={handleLike} style={{fontSize: '1.4em', color: currentUserAlreadyLiked ? 'red' : 'black', cursor: 'pointer'}}/>
                                    <Amount>{likesArray.length}</Amount>
                                </>
                        :
                        <></>

                    }

                    <BiSolidCommentDetail onClick={handleIsOpened} style={{fontSize: '1.4em', color: 'black', marginLeft: '10px', cursor: 'pointer'}}/>
                    <Amount onClick={handleIsOpened}>{post.comments.length} Comments</Amount>
                </PostLikesBarContainer>

                <CommentsWrapper isopened={isOpened}>

                    <CommentsTitle>Comments</CommentsTitle>
                    <CommentsContainer>

                        {
                            post.comments.map((commentData, index) => {
                                return (
                                    <Comment key={index} commentData={commentData}/>
                                )
                            })
                        }

                    </CommentsContainer>
                    {
                        (user) ? 
                            <UserReplyContainer>
                                <ProfilePic style={{marginLeft: '10px', marginTop: '20px', marginRight: '-10px'}} alt="Profile picture" src={`${userData?.profilePic}`} width={30} height={30}/>
                                <CreateNewPostInputContainer style={{paddingBottom: '0'}}>

                                    <CreateNewPostInput style={{fontSize: '1em', height: '150px'}} placeholder="Write a comment here"></CreateNewPostInput>
                                    <CreateNewPostInputButtonsContainer style={{justifyContent: 'flex-end'}}>
                                    <ButtonInverted style={{fontSize: '1em', fontWeight: '600', padding: '4px', margin: '0'}} >Send <BiSolidSend style={{marginLeft: '5px'}}/></ButtonInverted>
                                    </CreateNewPostInputButtonsContainer>

                                </CreateNewPostInputContainer>
                                
                            </UserReplyContainer>
                        :
                        <UserReplyContainer style={{justifyContent: 'center', alignItems: 'center', fontWeight: '600'}}>
                            Sign to write comments
                        </UserReplyContainer>
                    }
                </CommentsWrapper>
            </>
        }

            

        </PostContainer>
    )
}