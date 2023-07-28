'use client'
import SignUpComponent from "../../_components/auth/signUp/SignUp.component";
import {
  BigLogoContainer,
  FormsContainer,
  StripsContainerLeft,
  StripsContainerRight,
  StripOne,
  StripTwo,
  StripThree,
  HeaderDividerContainer,
  DividerRow,
  LoadingMomentum,
} from "../auth.styles"
import Image from "next/image"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/redux/user/user.action";
import { Helmet } from "react-helmet-async";
import { statePersist } from "@/app/_components/auth/Auth.server";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  
  useEffect(() => {
    const statePersistFunc = async () => {
        const user = await statePersist();
        dispatch(setCurrentUser(user));
        if (user) router.push("/");
    }
    statePersistFunc();
  }, []);
  
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Oswald:wght@400;500&family=Raleway:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet" />
      </Helmet>


      <main style={{display: "flex", overflow: "hidden",height: "100vh"}}>

        <BigLogoContainer>

          <StripsContainerRight>
            <StripOne />
            <StripTwo />
            <StripThree />
          </StripsContainerRight>
  
          <Image src="/Mutancia-Social.png" alt="Mutancia Social Logo" width={300} height={300} priority={true}/>

          <StripsContainerLeft>
            <StripThree />
            <StripTwo />
            <StripOne />
          </StripsContainerLeft>
  
        </BigLogoContainer>

        <FormsContainer>
          <HeaderDividerContainer>
            <DividerRow />
            <Image src="/Mutancia-Social-Black.png" alt="Mutancia Social Logo" width={50} height={50}/>
            <DividerRow />
          </HeaderDividerContainer>

          <SignUpComponent setIsLoading={setIsLoading}/>

          <LoadingMomentum display={`${isLoading}`}/>

        </FormsContainer>

      </main>
    </>
  )
}
