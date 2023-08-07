import { StepOneProps } from "@/lib/interfaces/welcome-steps.interface";
import { HeaderSteps, SubHeaderSteps, StepsContainer } from "@/app/welcome/welcome.styles";
import { StepOneContainer, ButtonsContainer } from "../steps.styles";
import { ButtonBase, ButtonInverted } from "@/app/GlobalStyles.styles";

export default function StepOne(props: StepOneProps) {
    const { isVisible, nextStep } = props

    return (
        <StepOneContainer style={{display: isVisible ? 'flex' : 'none'}}>
            <HeaderSteps>Let us know more about you</HeaderSteps>
            <SubHeaderSteps>Fill the coming survey to complete your profile so more people can reach and know about you!</SubHeaderSteps>

            <ButtonsContainer>
                <ButtonInverted onClick={nextStep}>Next</ButtonInverted>
            </ButtonsContainer>
        </StepOneContainer>
    )
}