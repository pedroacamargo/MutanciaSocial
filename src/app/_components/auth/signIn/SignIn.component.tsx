import {
    SignInForm,
    InputContainer,
    InputForm,
    RememberMeContainer,
    SignInSubmitButtonsContainer,
    AlreadyHaveAnAccount as DontHaveAnAccount,
} from "../AuthForms.styles";

import {
    LoadingMomentum
} from "@/app/(auth)/auth.styles";
import {
    ButtonBase,
    ErrorBox,
} from "@/app/GlobalStyles.styles";
import { FaLock, FaUser, FaGoogle } from "react-icons/fa";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserIsLoading } from "@/redux/user/user.selector";
import { useAuth } from "@/hooks/useAuth";

export default function SignInComponent() {
    const isLoading = useSelector(selectUserIsLoading);
    const { login, loginWithGoogle } = useAuth()
    const [usernameWrongErrorBox, setUsernameWrongErrorBox] = useState(false);
    const router = useRouter();

    const schema = yup.object().shape({
        username: yup.string().required("Username field is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password field is required"),
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmitSignIn = async (user: { username: string, password: string }) => {
        try {
            const currentUser = await login(user.username, user.password)
            
            if (currentUser) router.push("/") 
            else setUsernameWrongErrorBox(true);
        } catch(err) {
            console.error(err);
        }
    }

    const signInWithGoogle = async () => {
        const user = await loginWithGoogle();
        if (user) router.push("/");
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

            <div style={{width: '80%'}}>
                <DontHaveAnAccount href="/signup">Don&apos;t have an account yet? Register now</DontHaveAnAccount>
            </div>

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
                <ButtonBase type="button" onClick={signInWithGoogle}><FaGoogle size={15} style={{marginRight: "10px"}}/> Continue With Google</ButtonBase>
            </SignInSubmitButtonsContainer>

            <LoadingMomentum display={`${isLoading}`}/>

        </SignInForm>

    );
}