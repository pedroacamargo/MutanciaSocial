import { ButtonBase } from "@/app/GlobalStyles.styles"
import { ProfilePic } from "../navbar/Navbar.styles"
import { CreateNewPostContainer, CreateNewPostInputContainer, CreateNewPostInput, CreateNewPostInputButtonsContainer } from "./home.styles"
import { AiFillPicture } from 'react-icons/ai'
import { BiSolidSend } from "react-icons/bi"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { User } from "firebase/auth"
import { User as UserData } from "@/lib/interfaces/User.interface"
import { getUserFromAuthDBWithUid } from "../auth/Auth.server"
import { collection, doc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "@/utils/firebase"
import { databases } from "@/lib/types/databases.types"
import { PostsData } from "@/lib/interfaces/PostsData.interface"

interface CreateNewPostProps {
    user: User,
}

export default function CreateNewPost(props: CreateNewPostProps) {
    const { user } = props;
    const [isCreateNewPostOpened, setIsCreateNewPostOpened] = useState(false);
    const [formData, setFormData] = useState({
        content: "",
        hasImage: false
    })


    const handleOnFocus = () => setIsCreateNewPostOpened(!isCreateNewPostOpened);

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => setFormData({hasImage: false, content: e.target.value});

    const handleSubmitPost = async () => {
        if (formData.content.length < 9) {
            alert("Please, make a post with more than 8 characters!");
            return;
        } else if (formData.content.length > 500) {
            alert("Max characters boundaries passed! Post with 500+ characters is not allowed!");
            return;
        } else {
            const userData = await getUserFromAuthDBWithUid(user.uid) as UserData;
            const docData: PostsData = {
                comments: [],
                content: formData.content,
                hasImage: formData.hasImage,
                likes: 0,
                likesArray: [],
                postDate: `${new Date()}`,
                postId: `${userData.uid}_${userData.posts ? userData.posts.length : 0}`,
                userRef: userData.uid,
            }

            const newUserPostsArray = userData.posts ? [...userData.posts, docData.postId] : [docData.postId];

            await updateDoc(doc(db, databases.authDB, userData.uid), { posts: newUserPostsArray });
            await setDoc(doc(db, databases.postsDB, docData.postId), docData);
            alert('done');
            setFormData({
                content: "",
                hasImage: false,
            })
        }
    }

    return (
        <CreateNewPostContainer isopened={isCreateNewPostOpened} onMouseLeave={() => setIsCreateNewPostOpened(false)}>
            <ProfilePic style={{marginLeft: '20px', marginTop: '15px'}} alt="Profile picture" src={`${user.photoURL ? user.photoURL : '/Unknown_person.png'}`} width={30} height={30}/>
            <CreateNewPostInputContainer>

                <CreateNewPostInput onFocus={handleOnFocus} onChange={handleOnChange} placeholder="Share something with your followers..." value={formData.content}></CreateNewPostInput>
                <CreateNewPostInputButtonsContainer>

                    <AiFillPicture style={{color: 'black', cursor: 'pointer'}}/>
                    <ButtonBase style={{fontSize: '.8em', padding: '2px', margin: '0'}} onClick={handleSubmitPost} >Post <BiSolidSend style={{marginLeft: '5px'}}/></ButtonBase>

                </CreateNewPostInputButtonsContainer>

            </CreateNewPostInputContainer>
            
        </CreateNewPostContainer>
    )
}