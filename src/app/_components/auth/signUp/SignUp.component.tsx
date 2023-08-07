import { 
    SignUpForm,
    InputContainer,
    InputForm,
    SignUpSubmitButtonsContainer,
    AlreadyHaveAnAccount,
} from '../AuthForms.styles';
import {
    LoadingMomentum
} from '@/app/(auth)/auth.styles';
import { 
    ErrorBox,
    ButtonInverted,
} from '@/app/GlobalStyles.styles';
import { 
    FaUser,
    FaLock,
    FaEnvelope,
    FaGoogle
} from 'react-icons/fa';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectUserIsLoading } from '@/redux/user/user.selector';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function SignUpComponent() {
    const [usernameAlreadyExistsError, setUsernameAlreadyExistsError] = useState(false);
    const isLoading = useSelector(selectUserIsLoading);
    const router = useRouter();
    const { registerUser, login, loginWithGoogle } = useAuth();
    
    // React Forms Users Schema
    const schema = yup.object().shape({
        username: yup.string().required('Username field is required.'),
        email: yup.string().email().required('Email field is required'),
        password: yup.string().min(6, "Password must be at least 6 characters").max(20, "Password cannot exceed 20 characters").required('Password field is required'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Password field is required'),
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmitSignUp = async (user: {
        username: string,
        email: string,
        password: string,
        confirmPassword: string
    }) => {
        const { username, email, password, confirmPassword } = user;

        const response = await registerUser(username, email, password, confirmPassword);
        if (response) {
            await login(username, password);
            router.push('/welcome');
        } else {
            setUsernameAlreadyExistsError(true);
        }
    }

    
    const signUpWithGoogle = async () => {
        const user = await loginWithGoogle();
        if (user) router.push("/welcome");
    }

    const resetErrorBoxes = () => {
        setUsernameAlreadyExistsError(false);
    }
    
    return (
        <SignUpForm onSubmit={handleSubmit(onSubmitSignUp)} method="POST">
            <InputContainer>
                <FaUser size={20} color="white" style={{
                margin: "auto"
                }}/>
                <InputForm type="text" placeholder="Username..." {...register("username")} onChange={resetErrorBoxes}/>
            </InputContainer>

            <InputContainer>
                <FaEnvelope size={20} color="white" style={{
                margin: "auto"                
                }}/>
                <InputForm type="email" placeholder="Email..." {...register("email")} onChange={resetErrorBoxes}/>
            </InputContainer>

            <InputContainer>
                <FaLock size={20} color="white" style={{
                margin: "auto"
                }}/>
                <InputForm type="password" placeholder="Password..." {...register("password")} onChange={resetErrorBoxes}/>
            </InputContainer>

            <InputContainer>
                <FaLock size={20} color="white" style={{
                margin: "auto"                
                }}/>
                <InputForm type="password" placeholder="Confirm Password..." {...register("confirmPassword")} onChange={resetErrorBoxes}/>
            </InputContainer>

            <div style={{width: '80%', marginTop: '5px'}}>
                <AlreadyHaveAnAccount href='/signin'>I already have an account - Go to Sign In</AlreadyHaveAnAccount>
            </div>

            {errors.confirmPassword ? ( <ErrorBox>{errors.confirmPassword?.message}</ErrorBox> 
            ) : errors.username ? ( <ErrorBox>{errors.username?.message}</ErrorBox>
            ) : errors.email ? (<ErrorBox>{errors.email?.message}</ErrorBox>
            ) : errors.password ? ( <ErrorBox>{errors.password?.message}</ErrorBox> ) : <></>} 
            {usernameAlreadyExistsError && <ErrorBox> Email already in use! </ErrorBox>}

            <SignUpSubmitButtonsContainer>
                <ButtonInverted type="submit">Sign Up</ButtonInverted>
                <span style={{fontFamily: "monospace"}}>OR</span>
                <ButtonInverted type="button" onClick={signUpWithGoogle}><FaGoogle size={15} style={{marginRight: "10px"}}/> Continue With Google</ButtonInverted>
            </SignUpSubmitButtonsContainer>

            
            { isLoading ? <LoadingMomentum display={`${true}`}/> : <></>}


        </SignUpForm>
    );
}