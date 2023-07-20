'use client'
import { SignUp } from "./_components/auth/SignUp.server";
import {
  BigLogoContainer,
  FormsContainer,
  StripsContainer,
  StripOne,
  StripTwo,
  StripThree,
  HeaderDividerContainer,
  DividerRow,
  SignInForm,
  SignUpForm,
  InputContainer,
  InputForm,
  RememberMeContainer,
  SignInSubmitButtonsContainer,
  SignUpSubmitButtonsContainer,
  ButtonBase,
  ButtonInverted,
  ErrorBox,
  LoadingMomentum
} from "./Landing.styles"
import Image from "next/image"
import { FaUser, FaLock, FaGoogle, FaEnvelope } from 'react-icons/fa';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch } from "react-redux";
import { setCurrentUser } from '../redux/user/user.action'
import { auth } from "@/utils/firebase";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [signUp, setSignUp] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

      await SignUp(user);
      dispatch(setCurrentUser({
        displayName: auth.currentUser?.displayName,
        email: auth.currentUser?.email,
        uid: auth.currentUser?.uid,
      }))
      
      console.log("Signed up Successfully");
    } catch (err) {
      console.error(err);
    }
    
    setIsLoading(false);
  }

  return (
    <>
      <main style={{display: "flex", overflow: "hidden"}}>

        <BigLogoContainer>

          <StripsContainer linesalignment="right">
            <StripOne />
            <StripTwo />
            <StripThree />
          </StripsContainer>
  
          <Image src="/Mutancia-Social.png" alt="Mutancia Social Logo" width={300} height={300}/>

          <StripsContainer linesalignment="left">
            <StripThree />
            <StripTwo />
            <StripOne />
          </StripsContainer>
  
        </BigLogoContainer>




        <FormsContainer>

          <HeaderDividerContainer>
            <DividerRow />
            <Image src="/Mutancia-Social-Black.png" alt="Mutancia Social Logo" width={50} height={50}/>
            <DividerRow />
          </HeaderDividerContainer>


          <SignInForm action="#">

            <InputContainer>
              <FaUser size={20} color="white" style={{
                margin: "auto"
              }}/>
              <InputForm type="text" placeholder="Username..."/>
            </InputContainer>

            <InputContainer>
              <FaLock size={20} color="white" style={{
                margin: "auto"                
              }}/>
              <InputForm type="text" placeholder="Password..."/>
            </InputContainer>

            <RememberMeContainer>
              <input type="checkbox" id="rememberme" style={{marginRight: "5px", marginTop: "-2px"}}/>
              <label htmlFor="rememberme">Remember me</label>
            </RememberMeContainer>

            <SignInSubmitButtonsContainer>
              <ButtonBase type="button">Sign In</ButtonBase>
              <span style={{fontFamily: "monospace"}}>OR</span>
              <ButtonBase type="button"><FaGoogle size={15} style={{marginRight: "10px"}}/> Continue With Google</ButtonBase>
            </SignInSubmitButtonsContainer>

          </SignInForm>


          <HeaderDividerContainer>
            <DividerRow style={{width: "100%", marginTop: "30px"}}/>
          </HeaderDividerContainer>

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

          <LoadingMomentum display={`${isLoading}`}/>
        </FormsContainer>

      </main>
    </>
  )
}
