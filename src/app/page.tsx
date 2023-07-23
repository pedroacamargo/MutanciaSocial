'use client'
import SignUpComponent from "./_components/auth/signUp/SignUp.component";
import SignInComponent from "./_components/auth/signIn/SignIn.component";
import {
  MobileMutantial,
  BigLogoContainer,
  FormsContainer,
  StripsContainer,
  StripOne,
  StripTwo,
  StripThree,
  HeaderDividerContainer,
  DividerSquare,
  DividerRow,
  LoadingMomentum,
} from "./Landing.styles"
import Image from "next/image"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/redux/user/user.action";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth , (user) => {
      dispatch(setCurrentUser({
        displayName: user?.displayName,
        email: user?.email,
        uid: user?.uid,
      }));
      if (user) router.push('/home');
    })
        
    return unsubscribe; 
  })
  
  return (
    <>
      <main style={{display: "flex", overflow: "hidden",height: "100vh"}}>

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
            <DividerSquare/>
            <DividerRow style={{width: "100%", marginTop: "30px"}}/>
          </HeaderDividerContainer>

          <SignUpComponent setIsLoading={setIsLoading}/>

          <LoadingMomentum display={`${isLoading}`}/>
        </FormsContainer>

      </main>
    </>
  )
}
