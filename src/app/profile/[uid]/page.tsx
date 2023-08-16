'use client'
import { getUserFromAuthDBWithUid } from "@/app/_components/auth/Auth.server"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { User } from "@/lib/interfaces/User.interface";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { selectUserIsLoading } from "@/redux/user/user.selector";
import Spinner from "@/app/_components/spinner/Spinner.component";
import Profile from "@/app/_components/profile/profile.component";
import EditProfile from "@/app/_components/profile/editProfile.component";


export default function Page({ params }: { params: { uid: string }}) {
    const [errorsObject, setErrorsObject] = useState({ fileTooBig: false, nameTooBig: false, bioTooBig: false, userNotFound: false })
    const [editMode, setEditMode] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<User | undefined>(undefined);
    const [forms, setForms] = useState({ headerName: '', bio: '' });
    const currentUser = useCurrentUser();
    const isUserLoading = useSelector(selectUserIsLoading);

    useEffect(() => {
        const getUser = async () => {
            const user = await getUserFromAuthDBWithUid(params.uid) as User | undefined;
            if (user) {
                setUserProfile(user);
            } else {
                setErrorsObject({
                    ...errorsObject,
                    userNotFound: true,
                })
            }
        }
        getUser();
    }, [])

    if (errorsObject.userNotFound) {
        return <h1><br/><br/>ERROR 404: USER NOT FOUND</h1>
    }

    if (isUserLoading || userProfile == undefined) {
        return <Spinner></Spinner>
    }

    return (
        <>
            {!editMode ? (
                <Profile 
                    editMode={editMode}
                    setEditMode={setEditMode}
                    params={params}
                    setForms={setForms}
                    userProfile={userProfile}
                />
            ) : (
                <EditProfile 
                    user={currentUser.user}
                    userProfile={userProfile}
                    setEditMode={setEditMode}
                    forms={forms}
                    setForms={setForms}
                />
            )
        }
        </>
    )
}