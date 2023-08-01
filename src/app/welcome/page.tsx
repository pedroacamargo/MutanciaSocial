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
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function Welcome() {
    const stepsNumber = 5;
    const dispatch = useDispatch();
    const router = useRouter();
    const [stepsLeft, setStepsLeft] = useState(stepsNumber);

    useEffect(() => {
        dispatch(fetchUserAsync() as any);
    }, []);

    const nextStep = () => setStepsLeft(stepsLeft - 1);
    const previousStep = () => setStepsLeft(stepsLeft + 1);
    const skipSteps = () => router.push("/");

    return (
        <>
            <LoaderContainer>
                <Image alt="Logo" src={'/Mutancia-Social-Black.png'} width={50} height={50}></Image>
                <LoaderSkeleton>
                    <LoaderFill width={`calc(100% - ${100/stepsNumber * stepsLeft}% + 1px)`}></LoaderFill>
                </LoaderSkeleton>
            </LoaderContainer>

            <StepsContainer>

                <StepOne nextStep={nextStep} isVisible={stepsLeft == 5 ? true : false}/>
                <StepTwo nextStep={nextStep} previousStep={previousStep} isVisible={stepsLeft == 4 ? true : false}/>

            </StepsContainer>

            <AuthStepsContainer>
                <StepBall style={{backgroundColor: stepsLeft == 5 ? 'black' : 'white'}}/>
                <StepBall style={{backgroundColor: stepsLeft == 4 ? 'black' : 'white'}}/>
                <StepBall style={{backgroundColor: stepsLeft == 3 ? 'black' : 'white'}}/>
                <StepBall style={{backgroundColor: stepsLeft == 2 ? 'black' : 'white'}}/>
                <StepBall style={{backgroundColor: stepsLeft == 1 ? 'black' : 'white'}}/>
            </AuthStepsContainer>

        </>
    );
}