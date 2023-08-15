import { ButtonBase, ButtonInverted, ErrorBox } from "@/app/GlobalStyles.styles";
import { EditProfileDisplayName, EditProfileInputLabel, EditProfileName, EditProfilePictureInput, PictureContainer, ProfileContainer, ProfileDashboardContainer, ProfilePicture, UserCardBio, UserCardStatusWrapper, UserCardWrapper, UserStatusPinEmoji, UserStatusPinPop, UserStatusPinPopPhrase } from "@/app/profile/profile.styles";
import { User, updateProfile } from "firebase/auth";
import { User as UserProfile } from "@/lib/interfaces/User.interface";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "@/utils/firebase";
import { databases } from "@/lib/types/databases.types";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

interface EditProfileProps {
    user: User | null,
    userProfile: UserProfile | undefined,
    setEditMode: Dispatch<SetStateAction<boolean>>,
    setForms: Dispatch<SetStateAction<{
        headerName: string;
        bio: string;
    }>>,
    forms: {
        headerName: string,
        bio: string,
    }
}

export default function EditProfile(props: EditProfileProps) {
    const { user, userProfile, setEditMode, forms, setForms } = props;
    const [errorsObject, setErrorsObject] = useState({ fileTooBig: false, nameTooBig: false, bioTooBig: false, userNotFound: false })
    const [image, setImage] = useState<string | null | undefined>(null);
    const [imageExtension, setImageExtension] = useState("");
    const [changed, setChanged] = useState(false); // check if some form changed, state used to optimize the usability
    

    const removeImage = () => setImage(null);

    const handleSubmit = async () => {
        if (user && changed) {
            if (forms.headerName.length <= 18 && forms.headerName.length > 4 && forms.bio.length <= 100) {
                const docRef = doc(db, databases.authDB, user.uid);
                await updateDoc(docRef, {...forms});
            } else {
                if (forms.bio.length > 100) {
                    setErrorsObject({
                        ...errorsObject,
                        bioTooBig: true,
                    })
                } else {
                    setErrorsObject({
                        ...errorsObject,
                        nameTooBig: true,
                    })
                }
                return;
            }
                
            if (image) {
                const profileStorageRef = ref(storage, `profile/${user.uid}.${imageExtension}`);
                uploadString(profileStorageRef, image, "data_url").then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        const dbRef = collection(db, databases.authDB);
                        setDoc(doc(dbRef, user?.uid), { profilePic: url }, { merge: true })

                        if (auth.currentUser) {
                            console.log('Updating user profile picture... -> ',url);
                            updateProfile(auth.currentUser, { photoURL: url })
                        }
                    })
                })
                removeImage()
            }
            
            setEditMode(false);
            setChanged(false);
        } else {
            setEditMode(false);
        }
    }

    const handleCancel = () => {
        setChanged(false);
        setEditMode(false);
        setErrorsObject({
            fileTooBig: false,
            nameTooBig: false,
            bioTooBig: false,
            userNotFound: false,
        })
        setImage(null)
        setImageExtension("");
    }
    
    const handleImageInput = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const reader = new FileReader();
        
            if (e.target.files && e.target.files[0].size < 204800) {
                setErrorsObject({
                    ...errorsObject,
                    fileTooBig: false,
                });
                const file = e.target.files[0];
                
                const extension = file.type.split('/')[1];
                setImageExtension(extension)
                reader.readAsDataURL(file);
                
                reader.onload = (readerEvent) => {
                    setImage(readerEvent.target?.result as string);
                    setChanged(true);
                }
            } else {
                e.target.files = null;
                setErrorsObject({
                    ...errorsObject,
                    fileTooBig: false,
                });
            }
        } catch (err) {
            console.error(err);
        }
        
    }

    return (
        <ProfileContainer>
            <UserCardWrapper>
                <PictureContainer>
                    <ProfilePicture src={
                        userProfile?.profilePic ? userProfile.profilePic : user?.photoURL ? user.photoURL : '/Unknown_person.jpg'
                    } />
                    <UserStatusPinPop>
                        <UserStatusPinEmoji> 🦍</UserStatusPinEmoji>
                        <UserStatusPinPopPhrase>Training</UserStatusPinPopPhrase>
                    </UserStatusPinPop>
                </PictureContainer>
                <UserCardStatusWrapper>
                    <EditProfileInputLabel>Change profile Picture</EditProfileInputLabel>
                    <EditProfilePictureInput accept="image/x-png,image/gif,image/jpeg" type="file" name="readFile" id="fileInput" onChange={handleImageInput}/>
                    {
                        errorsObject.fileTooBig && <ErrorBox>The file must be less than 200Kb</ErrorBox>
                    }
                    

                    <EditProfileInputLabel htmlFor="editName">Name</EditProfileInputLabel>
                    {
                        <EditProfileName id="editName" min={4} onChange={(e) => {setForms({...forms, headerName: e.target.value}); if (!changed) setChanged(true)}} type="text" placeholder="Your name..." value={forms.headerName}/>
                    }
                    {
                        errorsObject.nameTooBig && <ErrorBox>Your name must be less than 18 characters</ErrorBox>
                    }

                    <EditProfileInputLabel htmlFor="editUsername">Username</EditProfileInputLabel>
                    <EditProfileDisplayName id="editUsername" disabled value={`@${userProfile?.displayName}`} />

                    <EditProfileInputLabel>Bio</EditProfileInputLabel>
                    <UserCardBio defaultValue={userProfile?.bio as string} onChange={(e) => {setForms({...forms, bio: e.target.value}); if (!changed) setChanged(true)}} placeholder="Edit your bio..."></UserCardBio>
                    {
                        errorsObject.bioTooBig && <ErrorBox>Your bio must be less than 100 characters</ErrorBox>
                    }

                </UserCardStatusWrapper>
                
                <ButtonBase onClick={handleSubmit} style={{width: '100%'}}>Submit</ButtonBase>
                <ButtonInverted onClick={handleCancel} style={{width: '100%'}}>Cancel</ButtonInverted>
            </UserCardWrapper>

            <ProfileDashboardContainer>
                Here will be the others status
            </ProfileDashboardContainer>

        </ProfileContainer>
    )
}