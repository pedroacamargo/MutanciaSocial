'use client'
import SignUpComponent from "./_components/auth/signUp/SignUp.component";
import SignInComponent from "./_components/auth/signIn/SignIn.component";
import {
  BigLogoContainer,
  FormsContainer,
  StripsContainer,
  StripOne,
  StripTwo,
  StripThree,
  HeaderDividerContainer,
  DividerRow,
  LoadingMomentum
} from "./Landing.styles"
import Image from "next/image"
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

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


          <SignInComponent setIsLoading={setIsLoading}/>


          <HeaderDividerContainer>
            <DividerRow style={{width: "100%", marginTop: "30px"}}/>
          </HeaderDividerContainer>

          <SignUpComponent setIsLoading={setIsLoading}/>

          <LoadingMomentum display={`${isLoading}`}/>
        </FormsContainer>

      </main>
    </>
  )
}
