'use client'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserAsync } from "@/redux/user/user.action";
import {
    AuthStepsContainer,
    StepBall,
    LoaderContainer,
    LoaderSkeleton,
    LoaderFill,
    StepsContainer
} from "./welcome.styles";
import StepOne from "../_components/welcome/step1/StepOne.component";
import StepTwo from "../_components/welcome/step2/StepTwo.component";
import StepThree from "../_components/welcome/step3/StepThree.component";
import StepFour from "../_components/welcome/step4/StepFour.component";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { WelcomeForm } from "@/lib/interfaces/welcome-steps.interface";
import StepSubmit from "../_components/welcome/stepSubmit/StepSubmit.component";

export default function Welcome() {
    const stepsNumber = 5;
    const dispatch = useDispatch();
    const router = useRouter();
    const [stepsLeft, setStepsLeft] = useState(stepsNumber);
    const [welcomeForms, setWelcomeForms] = useState<WelcomeForm>({
        acceptedConditions: false,
        grantDataSavePermission: false,
        gender: '',
        country: '',
        age: 0,
        height: 0,
        weight: 0,
        sports: [],
    });

    useEffect(() => {
        dispatch(fetchUserAsync() as any);
    }, []);

    const nextStep = () => setStepsLeft(stepsLeft - 1);
    const previousStep = () => setStepsLeft(stepsLeft + 1);

    return (
        <div style={{
            display: "flex",
            width: "100%",
            height: "100vh",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <LoaderContainer>
                <Image alt="Logo" src={'/Mutancia-Social-Black.png'} width={50} height={50}></Image>
                <LoaderSkeleton>
                    <LoaderFill width={`calc(100% - ${100/stepsNumber * stepsLeft}% + 1px)`}></LoaderFill>
                </LoaderSkeleton>
            </LoaderContainer>

            <StepsContainer>

                <StepOne nextStep={nextStep} isVisible={stepsLeft == 5 ? true : false}/>
                <StepTwo setForms={setWelcomeForms} forms={welcomeForms} nextStep={nextStep} previousStep={previousStep} isVisible={stepsLeft == 4 ? true : false}/>
                <StepThree setForms={setWelcomeForms} forms={welcomeForms} nextStep={nextStep} previousStep={previousStep} isVisible={stepsLeft == 3 ? true : false}/>
                <StepFour setForms={setWelcomeForms} forms={welcomeForms} nextStep={nextStep} previousStep={previousStep} isVisible={stepsLeft == 2 ? true : false}/>
                <StepSubmit forms={welcomeForms} previousStep={previousStep} isVisible={stepsLeft == 1 ? true : false}/>

            </StepsContainer>

            <AuthStepsContainer>
                <StepBall style={{backgroundColor: stepsLeft == 5 ? 'black' : 'white'}}/>
                <StepBall style={{backgroundColor: stepsLeft == 4 ? 'black' : 'white'}}/>
                <StepBall style={{backgroundColor: stepsLeft == 3 ? 'black' : 'white'}}/>
                <StepBall style={{backgroundColor: stepsLeft == 2 ? 'black' : 'white'}}/>
                <StepBall style={{backgroundColor: stepsLeft == 1 ? 'black' : 'white'}}/>
            </AuthStepsContainer>

        </div>
    );
}