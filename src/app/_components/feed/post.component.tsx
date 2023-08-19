import { User } from "firebase/auth"
import { ProfilePic } from "../navbar/Navbar.styles"
import { Amount, CommentWrapper, CommentsContainer, CommentsTitle, CommentsWrapper, CreateNewPostContainer, CreateNewPostInput, CreateNewPostInputButtonsContainer, CreateNewPostInputContainer, FlexContainer, PostContainer, PostContent, PostHeader, PostHeaderName, PostHeaderPostTime, PostHeaderStats, PostLikesBarContainer, UserReplyContainer } from "./home.styles"
import { AiFillHeart, AiFillPicture } from "react-icons/ai"
import { BiSolidCommentDetail, BiSolidSend } from "react-icons/bi"
import Comment from "./comment.component"
import { ButtonBase, ButtonInverted } from "@/app/GlobalStyles.styles"
import { useState } from "react"

interface PostProps {
    user: User,
}

export default function Post(props: PostProps) {
    const { user } = props;
    const [isOpened, setIsOpened] = useState(false);

    const handleIsOpened = () => setIsOpened(!isOpened);

    return (
        <PostContainer>
            <PostHeader>

                <ProfilePic alt="Profile pic" src={`/Unknown_person.png`} height={30} width={30}></ProfilePic>
                <PostHeaderStats>
                    <PostHeaderName>Anonymous</PostHeaderName>
                    <PostHeaderPostTime>Posted 1 hour ago</PostHeaderPostTime>
                </PostHeaderStats>
            </PostHeader>
            <PostContent>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident mollitia neque repellat dolorum delectus. Animi accusantium architecto dolore et perspiciatis accusamus temporibus tempora nihil, voluptates ratione laborum molestiae, quasi modi.</PostContent>
            <PostLikesBarContainer>
                <AiFillHeart style={{fontSize: '1.4em', color: 'red', cursor: 'pointer'}}/>
                <Amount>10</Amount>
                <BiSolidCommentDetail onClick={handleIsOpened} style={{fontSize: '1.4em', color: 'black', marginLeft: '10px', cursor: 'pointer'}}/>
                <Amount onClick={handleIsOpened}>2 Comments</Amount>
            </PostLikesBarContainer>

            <CommentsWrapper isopened={isOpened}>

                <CommentsTitle>Comments</CommentsTitle>
                <CommentsContainer>

                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                </CommentsContainer>
                <UserReplyContainer>
                    <ProfilePic style={{marginLeft: '10px', marginTop: '20px', marginRight: '-10px'}} alt="Profile picture" src={`${user.photoURL}`} width={30} height={30}/>
                    <CreateNewPostInputContainer style={{paddingBottom: '0'}}>

                        <CreateNewPostInput style={{fontSize: '1em', height: '150px'}} placeholder="Write a comment here"></CreateNewPostInput>
                        <CreateNewPostInputButtonsContainer style={{justifyContent: 'flex-end'}}>
                        <ButtonInverted style={{fontSize: '1em', fontWeight: '600', padding: '4px', margin: '0'}} >Send <BiSolidSend style={{marginLeft: '5px'}}/></ButtonInverted>
                        </CreateNewPostInputButtonsContainer>

                    </CreateNewPostInputContainer>
                    
                </UserReplyContainer>
            </CommentsWrapper>

        </PostContainer>
    )
}