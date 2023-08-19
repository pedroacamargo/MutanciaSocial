import { AiFillHeart } from "react-icons/ai";
import { ProfilePic } from "../navbar/Navbar.styles";
import { Amount, CommentWrapper, PostContent, PostHeader, PostHeaderName, PostHeaderPostTime, PostHeaderStats, PostLikesBarContainer } from "./home.styles";
import { BiSolidCommentDetail } from "react-icons/bi";


// TODO: replies to comments
export default function Comment() {



    return (
        <CommentWrapper>
            <PostHeader>

                <ProfilePic alt="Profile pic" src={`/Unknown_person.png`} height={30} width={30}></ProfilePic>
                <PostHeaderStats>
                    <PostHeaderName>Anonymous</PostHeaderName>
                    <PostHeaderPostTime>Posted 1 hour ago</PostHeaderPostTime>
                </PostHeaderStats>
            </PostHeader>
            <PostContent style={{fontSize: '1em'}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident mollitia neque repellat dolorum delectus. Animi accusantium architecto dolore et perspiciatis accusamus temporibus tempora nihil, voluptates ratione laborum molestiae, quasi modi.</PostContent>
            <PostLikesBarContainer>
                <AiFillHeart style={{fontSize: '1.4em', color: 'red', cursor: 'pointer'}}/>
                <Amount>2</Amount>
            </PostLikesBarContainer>
        </CommentWrapper>
    )
}