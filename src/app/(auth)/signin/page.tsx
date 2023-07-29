'use client'
import SignInComponent from "@/app/_components/auth/signIn/SignIn.component";
import {
  FormsContainer,
  HeaderDividerContainer,
  DividerRow,
} from "../auth.styles"
import Image from "next/image"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/user/user.selector";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchUserAsync } from "@/redux/user/user.action";
import { Helmet } from "react-helmet-async";
import LogoContainer from "@/app/_components/auth/LogoContainer.component";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userData = useSelector(selectCurrentUser);
  
  
  useEffect(() => {
    dispatch(fetchUserAsync() as any);
    if (userData) router.push('/');
  }, [])
  
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

          <SignInComponent/>

        </FormsContainer>

      </main>
    </>
  )
}
