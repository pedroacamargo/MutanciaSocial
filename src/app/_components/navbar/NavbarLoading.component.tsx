import { FaCaretDown } from "react-icons/fa";
import { NavbarContainer, NavbarLogoContainer, NavbarLogoName, NavbarLoadingSkeleton, NavbarLoadingSkeletonContainer, NavbarLinksContainer, UserLoggedContainer, UserNameLoadingSkeleton, UserNameLoadingContainer, UserProfilePictureLoadingContainer, UserProfilePictureLoadingSkeleton } from "./Navbar.styles";
import Image from "next/image";

export default function NavbarLoading() {
    return (
        <NavbarContainer>

            <NavbarLogoContainer>
                <Image src="/Mutancia-Social-Black.png" alt="Mutancia Social Logo" width={45} height={45}/>
                <NavbarLogoName>Mutantial</NavbarLogoName>
            </NavbarLogoContainer>

            <NavbarLinksContainer>
                <NavbarLoadingSkeletonContainer>
                    <NavbarLoadingSkeleton/>
                </NavbarLoadingSkeletonContainer>

                <NavbarLoadingSkeletonContainer>
                    <NavbarLoadingSkeleton/>
                </NavbarLoadingSkeletonContainer>

                <NavbarLoadingSkeletonContainer>
                    <NavbarLoadingSkeleton/>
                </NavbarLoadingSkeletonContainer>
                
                <NavbarLoadingSkeletonContainer>
                    <NavbarLoadingSkeleton/>
                </NavbarLoadingSkeletonContainer>

                <UserLoggedContainer>
                    <FaCaretDown />
                    <UserNameLoadingContainer>
                        <UserNameLoadingSkeleton />
                    </UserNameLoadingContainer>

                    <UserProfilePictureLoadingContainer>
                        <UserProfilePictureLoadingSkeleton />
                    </UserProfilePictureLoadingContainer>

                </UserLoggedContainer>
            </NavbarLinksContainer>

        </NavbarContainer> 

    );
}