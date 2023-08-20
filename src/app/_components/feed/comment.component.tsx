import { AiFillHeart } from "react-icons/ai";
import { ProfilePic } from "../navbar/Navbar.styles";
import { Amount, CommentWrapper, PostContent, PostHeader, PostHeaderName, PostHeaderPostTime, PostHeaderStats, PostLikesBarContainer } from "./home.styles";
import { BiSolidCommentDetail } from "react-icons/bi";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { databases } from "@/lib/types/databases.types";
import { User } from "@/lib/interfaces/User.interface";
import { db } from "@/utils/firebase";
import Spinner from "../spinner/Spinner.component";

interface CommentsProps {
    commentData: {
        content: string,
        likes: number,
        userRef: string
    }
}

// TODO: replies to comments
export default function Comment(props: CommentsProps) {
    const { commentData } = props;
    const [userData, setUserData] = useState<User>()
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [likesAmount, setLikesAmount] = useState(commentData.likes);
    
    useEffect(() => {
        const getUserPostData = async () => {
            const postDoc = doc(db, databases.authDB, commentData.userRef);
            const postSnap = (await getDoc(postDoc)).data() as User;
            setUserData(postSnap);
            setIsLoading(false);
        }
        getUserPostData();
    }, [])

    if (isLoading) return <Spinner></Spinner>

    return (
        <CommentWrapper>
            <PostHeader>

                <ProfilePic alt="Profile pic" src={`/Unknown_person.png`} height={30} width={30}></ProfilePic>
                <PostHeaderStats>
                    <PostHeaderName>{userData?.headerName}</PostHeaderName>
                    <PostHeaderPostTime>Posted 1 hour ago</PostHeaderPostTime>
                </PostHeaderStats>
            </PostHeader>
            <PostContent style={{fontSize: '1em'}}>{commentData.content}</PostContent>
            <PostLikesBarContainer>
                <AiFillHeart style={{fontSize: '1.4em', color: 'red', cursor: 'pointer'}}/>
                <Amount>{likesAmount}</Amount>
            </PostLikesBarContainer>
        </CommentWrapper>
    )
}