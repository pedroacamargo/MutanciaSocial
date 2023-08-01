import { StepsProps } from "@/lib/interfaces/welcome-steps.interface";
import { HeaderSteps, SubHeaderSteps, StepsContainer } from "@/app/welcome/welcome.styles";
import { StepOneContainer, ButtonsContainer } from "./StepOne.styles";
import { ButtonBase, ButtonInverted } from "@/app/GlobalStyles.styles";

export default function StepOne(props: StepsProps) {
    const { isVisible, skipSteps, nextStep } = props

    return (
        <StepOneContainer style={{display: isVisible ? 'flex' : 'none'}}>
            <HeaderSteps>Let us know more about you</HeaderSteps>
            <SubHeaderSteps>Fill the coming survey to complete your profile so more people can reach and know about you!</SubHeaderSteps>

            <ButtonsContainer>
                <ButtonBase onClick={skipSteps}>Skip</ButtonBase>
                <ButtonInverted onClick={nextStep}>Next</ButtonInverted>
            </ButtonsContainer>
        </StepOneContainer>
    )
}