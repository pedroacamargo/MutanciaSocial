'use client'
import SignUpComponent from "../../_components/auth/signUp/SignUp.component";
import LogoContainer from "@/app/_components/auth/LogoContainer.component";
import {
  FormsContainer,
  HeaderDividerContainer,
  DividerRow,
  AuthCaption
} from "../auth.styles"
import Image from "next/image"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAsync } from "@/redux/user/user.action";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  useEffect(() => {
    dispatch(fetchUserAsync() as any);
  }, []);
  
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Oswald:wght@400;500&family=Raleway:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet" />
      </Helmet>


      <main style={{display: "flex", overflow: "hidden",height: "100vh"}}>
        
        <LogoContainer/>

        <FormsContainer>


          <HeaderDividerContainer>
            <DividerRow />
            <Image src="/Mutancia-Social-Black.png" alt="Mutancia Social Logo" width={50} height={50}/>
            <DividerRow />
          </HeaderDividerContainer>

          <AuthCaption>Register</AuthCaption>

          <SignUpComponent/>

        </FormsContainer>
      </main>
    </>
  )
}
