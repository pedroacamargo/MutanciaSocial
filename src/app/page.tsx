'use client'
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
} from "./Landing.styles"
import GlobalStyle from "./GlobalStyles.styles"
import Image from "next/image"
import { FaUser, FaLock, FaGoogle, FaEnvelope } from 'react-icons/fa';


export default function Home() {
  return (
    <>
      <GlobalStyle />

      <main style={{display: "flex", overflow: "hidden"}}>

        <BigLogoContainer>

          <StripsContainer linesAlignment="right">
            <StripOne />
            <StripTwo />
            <StripThree />
          </StripsContainer>
  
          <Image src="/Mutancia-Social.png" alt="Mutancia Social Logo" width={300} height={300}/>

          <StripsContainer linesAlignment="left">
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

          <SignUpForm action="#">

            <InputContainer>
              <FaUser size={20} color="white" style={{
                margin: "auto"
              }}/>
              <InputForm type="text" placeholder="Username..."/>
            </InputContainer>

            <InputContainer>
              <FaEnvelope size={20} color="white" style={{
                margin: "auto"                
              }}/>
              <InputForm type="text" placeholder="Email..."/>
            </InputContainer>

            <InputContainer>
              <FaLock size={20} color="white" style={{
                margin: "auto"
              }}/>
              <InputForm type="text" placeholder="Password..."/>
            </InputContainer>

            <InputContainer>
              <FaLock size={20} color="white" style={{
                margin: "auto"                
              }}/>
              <InputForm type="text" placeholder="Confirm Password..."/>
            </InputContainer>

            <SignUpSubmitButtonsContainer>
              <ButtonInverted type="button">Sign Up</ButtonInverted>
              <span style={{fontFamily: "monospace"}}>OR</span>
              <ButtonInverted type="button"><FaGoogle size={15} style={{marginRight: "10px"}}/> Continue With Google</ButtonInverted>
            </SignUpSubmitButtonsContainer>

          </SignUpForm>


        </FormsContainer>

      </main>
    </>
  )
}
