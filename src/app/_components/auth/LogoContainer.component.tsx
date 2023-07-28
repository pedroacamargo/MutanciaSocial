import Image from "next/image";
import {
    BigLogoContainer,
    StripsContainerRight,
    StripsContainerLeft,
    StripOne,
    StripTwo,
    StripThree
} from "@/app/(auth)/auth.styles";

export default function LogoContainer() {
    return (
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
    );
}