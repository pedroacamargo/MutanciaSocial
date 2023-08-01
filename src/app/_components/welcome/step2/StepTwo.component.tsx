import { StepsProps } from "@/lib/interfaces/welcome-steps.interface";
import { HeaderSteps, SubHeaderSteps } from "@/app/welcome/welcome.styles";
import { StepOneContainer, ButtonsContainer, FormsContainer, CheckBoxContainer, CheckBoxWelcome, LabelWelcome } from "../steps.styles";
import { ButtonBase, ButtonInverted } from "@/app/GlobalStyles.styles";
import { ErrorBox } from "@/app/GlobalStyles.styles";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function StepTwo(props: StepsProps) {
    const { isVisible, nextStep, previousStep } = props
    const [forms, setForms] = useState({
        isConditionsAccepted: false,
        grantDataSavePermission: false,
    });
    const [showErrorBox, setShowErrorBox] = useState(false)


    const handleSubmit = () => {
        if (!forms.grantDataSavePermission || !forms.isConditionsAccepted) {
            setShowErrorBox(true);
            return;
        } else nextStep();
    }

    return (
        <StepOneContainer style={{display: isVisible ? 'flex' : 'none'}}>
            <HeaderSteps>Just a reminder</HeaderSteps>
            <SubHeaderSteps>In order to continue and use Mutantial, you must accept just a few things:</SubHeaderSteps>


            <FormsContainer>
                <CheckBoxContainer ischecked={`${forms.isConditionsAccepted}`} onClick={() => setForms({...forms, isConditionsAccepted: !forms.isConditionsAccepted})}>
                    <CheckBoxWelcome ischecked={`${forms.isConditionsAccepted}`} id="conditions">
                        <FaCheck style={{display: forms.isConditionsAccepted ? 'block' : 'none', width: '15px', height: '15px'}} color="white"></FaCheck>
                    </CheckBoxWelcome>
                    <LabelWelcome ischecked={`${forms.isConditionsAccepted}`} htmlFor="conditions">I accept the terms of condition and use</LabelWelcome>
                </CheckBoxContainer>
            </FormsContainer>

            <FormsContainer style={{marginTop: '0px'}}>
                <CheckBoxContainer ischecked={`${forms.grantDataSavePermission}`} onClick={() => setForms({...forms, grantDataSavePermission: !forms.grantDataSavePermission})}>
                    <CheckBoxWelcome ischecked={`${forms.grantDataSavePermission}`} id="conditions">
                        <FaCheck style={{display: forms.grantDataSavePermission ? 'block' : 'none', width: '15px', height: '15px'}} color="white"></FaCheck>
                    </CheckBoxWelcome>
                    <LabelWelcome ischecked={`${forms.grantDataSavePermission}`} htmlFor="conditions">I grant permission to Mutantial store my user data</LabelWelcome>
                </CheckBoxContainer>
            </FormsContainer>

            <ErrorBox style={{marginBottom: '0px', display: showErrorBox ? 'flex' : 'none'}}>Please accept both boxes above to use Mutantial</ErrorBox>

            <ButtonsContainer>
                <ButtonBase onClick={previousStep}>Previous</ButtonBase>
                <ButtonInverted onClick={handleSubmit}>Next</ButtonInverted>
            </ButtonsContainer>
        </StepOneContainer>
    )
}