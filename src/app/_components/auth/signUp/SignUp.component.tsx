import { 
    SignUpForm,
    InputContainer,
    InputForm,
    SignUpSubmitButtonsContainer
} from '../AuthForms.styles';

import { 
    ErrorBox,
    ButtonInverted
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
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/redux/user/user.action';
import { SignUp } from './SignUp.server';
import { useRouter } from 'next/navigation';
import { updateProfile, getAuth } from 'firebase/auth';
import { useState } from 'react';

interface SignUpComponentProps {
    setIsLoading: (isLoading: boolean) => void,
}

export default function SignUpComponent(props: SignUpComponentProps) {
    const { setIsLoading } = props;
    const [usernameAlreadyExistsError, setUsernameAlreadyExistsError] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    
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
        setIsLoading(true);
        const auth: any = getAuth();

        const userData = {
            displayName: user.username,
            email: user.email,
        }
        
        // console.log(user);
        try {
            const response = await SignUp(user);
            
            if (response) {

                try {
                    updateProfile(auth.currentUser, {
                        displayName: user.username
                    })
                } catch (err) {
                    console.error("Display name wasn't updated!");
                }


                dispatch(setCurrentUser({
                    ...userData,
                    uid: auth.currentUser?.uid,
                }));

                window.localStorage.clear();
                window.localStorage.setItem('currentUser', JSON.stringify({...userData, uid: auth.currentUser?.uid}));
                router.push("/");
            } else {
                console.log("Sign Up failed :(");
                setUsernameAlreadyExistsError(true);
            } 
        } catch (err) {
            console.error(err);
        }

        setIsLoading(false);
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

            {errors.confirmPassword ? ( <ErrorBox>{errors.confirmPassword?.message}</ErrorBox> 
            ) : errors.username ? ( <ErrorBox>{errors.username?.message}</ErrorBox>
            ) : errors.email ? (<ErrorBox>{errors.email?.message}</ErrorBox>
            ) : errors.password ? ( <ErrorBox>{errors.password?.message}</ErrorBox> ) : <></>} 
            {usernameAlreadyExistsError && <ErrorBox> Username already exists! </ErrorBox>}

            <SignUpSubmitButtonsContainer>
                <ButtonInverted type="submit">Sign Up</ButtonInverted>
                <span style={{fontFamily: "monospace"}}>OR</span>
                <ButtonInverted type="button"><FaGoogle size={15} style={{marginRight: "10px"}}/> Continue With Google</ButtonInverted>
            </SignUpSubmitButtonsContainer>

        </SignUpForm>
    );
}