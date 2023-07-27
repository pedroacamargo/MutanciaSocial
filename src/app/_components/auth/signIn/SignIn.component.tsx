import { SignIn } from "./SignIn.server";
import {
    SignInForm,
    InputContainer,
    InputForm,
    RememberMeContainer,
    SignInSubmitButtonsContainer,
} from "../Auth.styles";
import {
    ButtonBase,
    ErrorBox,
} from "@/app/Landing.styles";
import { FaLock, FaUser, FaGoogle } from "react-icons/fa";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/redux/user/user.action";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";
import { useState } from "react";

interface SignInComponentProps {
    setIsLoading: (isLoading: boolean) => void,
}

export default function SignInComponent(props: SignInComponentProps) {
    const { setIsLoading } = props;
    const [usernameWrongErrorBox, setUsernameWrongErrorBox] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const schema = yup.object().shape({
        username: yup.string().required("Username field is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password field is required"),
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmitSignIn = async (user: {
        username: string,
        password: string,
    }) => {
        setIsLoading(true);

        try {
            const response = await SignIn(user);
            const userData = {
                displayName: user.username,
                email: auth.currentUser?.email,
            }

            dispatch(setCurrentUser({
                ...userData,
                uid: auth.currentUser?.uid,
            }))

            if (response) {

                window.localStorage.clear();
                window.localStorage.setItem('currentUser', JSON.stringify({...userData, uid: auth.currentUser?.uid}));
                router.push("/dashboard");
                
            } else {
                console.log("Sign Up failed :(");
                setUsernameWrongErrorBox(true);
            } 

        } catch(err) {
            console.error(err);
        }

        setIsLoading(false);
    }

    return (
        <SignInForm onSubmit={handleSubmit(onSubmitSignIn)} method="POST">

            <InputContainer>
                <FaUser size={20} color="white" style={{
                margin: "auto"
                }}/>
                <InputForm type="text" placeholder="Username..." {...register("username")}/>
            </InputContainer>

            <InputContainer>
                <FaLock size={20} color="white" style={{
                margin: "auto"                
                }}/>
                <InputForm type="password" placeholder="Password..." {...register("password")} />
            </InputContainer>

            <RememberMeContainer>
                <input type="checkbox" id="rememberme" style={{marginRight: "5px", marginTop: "-2px"}}/>
                <label htmlFor="rememberme">Remember me</label>
            </RememberMeContainer>

            {errors.username ? ( <ErrorBox>{errors.username?.message}</ErrorBox> || !usernameWrongErrorBox
            ) : errors.password ? ( <ErrorBox>{errors.password?.message}</ErrorBox> || !usernameWrongErrorBox) : <></>}
            {usernameWrongErrorBox && <ErrorBox>Please enter a valid Username or Password</ErrorBox>}

            <SignInSubmitButtonsContainer>
                <ButtonBase type="submit">Sign In</ButtonBase>
                <span style={{fontFamily: "monospace"}}>OR</span>
                <ButtonBase type="button"><FaGoogle size={15} style={{marginRight: "10px"}}/> Continue With Google</ButtonBase>
            </SignInSubmitButtonsContainer>

        </SignInForm>

    );
}