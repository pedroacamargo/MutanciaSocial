import { ButtonBase, ButtonInverted } from "@/app/GlobalStyles.styles";
import { ButtonsContainer, StepOneContainer } from "../steps.styles";
import { SubmitStepsProps } from "@/lib/interfaces/welcome-steps.interface";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/utils/firebase";
import { databases } from "@/lib/types/databases.types";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { HeaderSteps, SubHeaderSteps } from "@/app/welcome/welcome.styles";
import { LoadingMomentum } from "@/app/(auth)/auth.styles";
import { useState } from "react";

export default function StepSubmit(props: SubmitStepsProps) {
    const { previousStep, forms, isVisible } = props
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useCurrentUser();
    const router = useRouter();

    const handleSubmit = async () => {
        if (user) {
            setIsLoading(true)
            const docRef = doc(db, databases.authDB, user.uid);
            await updateDoc(docRef, {...forms})
            Cookies.set("currentUser", JSON.stringify({ user: auth.currentUser, acceptedConditions: true }), { secure: true });
            setIsLoading(false)
            router.push('/');
        }
    }

    return (
        <StepOneContainer style={{display: isVisible ? 'flex' : 'none'}}>
            <HeaderSteps>Registering completed</HeaderSteps>
            <SubHeaderSteps>Hit submit to complete your survey and navigate to the home page, where you&apos;ll be able to enjoy Mutantial!</SubHeaderSteps>
            <ButtonsContainer>
                <ButtonBase onClick={previousStep}>Previous</ButtonBase>
                <ButtonInverted onClick={handleSubmit}>Submit</ButtonInverted>
            </ButtonsContainer>

            <LoadingMomentum display={`${isLoading}`}/>

        </StepOneContainer>
    )
}