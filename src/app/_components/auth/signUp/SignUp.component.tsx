import { 
    SignUpForm,
    InputContainer,
    InputForm,
    SignUpSubmitButtonsContainer
} from '../Auth.styles';

import { 
    ErrorBox,
    ButtonInverted
} from '@/app/Landing.styles';

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
import { auth } from '@/utils/firebase';
import { useRouter } from 'next/navigation';

interface SignUpComponentProps {
    setIsLoading: (isLoading: boolean) => void,
}

export default function SignUpComponent(props: SignUpComponentProps) {
    const { setIsLoading } = props;
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

        try {
            const response = await SignUp(user);
            dispatch(setCurrentUser({
                displayName: user.username,
                email: auth.currentUser?.email,
                uid: auth.currentUser?.uid,
            }))

            if (response) {
                console.log("Signed up Successfully");
                router.push("/home");
            } else console.log("Sign Up failed :(");

        } catch (err) {
            console.error(err);
        }

        setIsLoading(false);
    }

    return (
        <SignUpForm onSubmit={handleSubmit(onSubmitSignUp)} method="POST">

            <InputContainer>
                <FaUser size={20} color="white" style={{
                margin: "auto"
                }}/>
                <InputForm type="text" placeholder="Username..." {...register("username")}/>
            </InputContainer>

            <InputContainer>
                <FaEnvelope size={20} color="white" style={{
                margin: "auto"                
                }}/>
                <InputForm type="email" placeholder="Email..." {...register("email")}/>
            </InputContainer>

            <InputContainer>
                <FaLock size={20} color="white" style={{
                margin: "auto"
                }}/>
                <InputForm type="password" placeholder="Password..." {...register("password")}/>
            </InputContainer>

            <InputContainer>
                <FaLock size={20} color="white" style={{
                margin: "auto"                
                }}/>
                <InputForm type="password" placeholder="Confirm Password..." {...register("confirmPassword")}/>
            </InputContainer>

            {errors.confirmPassword ? ( <ErrorBox>{errors.confirmPassword?.message}</ErrorBox> 
            ) : errors.username ? ( <ErrorBox>{errors.username?.message}</ErrorBox>
            ) : errors.email ? (<ErrorBox>{errors.email?.message}</ErrorBox>
            ) : errors.password ? ( <ErrorBox>{errors.password?.message}</ErrorBox> ) : <></>} 

            <SignUpSubmitButtonsContainer>
                <ButtonInverted type="submit">Sign Up</ButtonInverted>
                <span style={{fontFamily: "monospace"}}>OR</span>
                <ButtonInverted type="button"><FaGoogle size={15} style={{marginRight: "10px"}}/> Continue With Google</ButtonInverted>
            </SignUpSubmitButtonsContainer>

        </SignUpForm>
    );
}