import { ButtonBase } from "@/app/GlobalStyles.styles"
import { ProfilePic } from "../navbar/Navbar.styles"
import { CreateNewPostContainer, CreateNewPostInputContainer, CreateNewPostInput, CreateNewPostInputButtonsContainer } from "./home.styles"
import { AiFillPicture } from 'react-icons/ai'
import { BiSolidSend } from "react-icons/bi"
import { useState } from "react"
import { User } from "firebase/auth"

interface CreateNewPostProps {
    user: User,
}

export default function CreateNewPost(props: CreateNewPostProps) {
    const { user } = props;
    const [isCreateNewPostOpened, setIsCreateNewPostOpened] = useState(false);

    const handleOnFocus = () => setIsCreateNewPostOpened(!isCreateNewPostOpened);

    return (
        <CreateNewPostContainer isopened={isCreateNewPostOpened} onMouseLeave={() => setIsCreateNewPostOpened(false)}>
            <ProfilePic style={{marginLeft: '20px', marginTop: '15px'}} alt="Profile picture" src={`${user.photoURL}`} width={30} height={30}/>
            <CreateNewPostInputContainer>

                <CreateNewPostInput onFocus={handleOnFocus} placeholder="How was your training today?"></CreateNewPostInput>
                <CreateNewPostInputButtonsContainer>
                    <AiFillPicture style={{color: 'black', cursor: 'pointer'}}/>
                    <ButtonBase style={{fontSize: '.8em', padding: '2px', margin: '0'}} >Post <BiSolidSend style={{marginLeft: '5px'}}/></ButtonBase>

                </CreateNewPostInputButtonsContainer>

            </CreateNewPostInputContainer>
            
        </CreateNewPostContainer>
    )
}