'use client'

import { LoaderContainer, LoadingCompletion } from "./LoadingBar.styles";

interface LoadingBarProps {
    completion: number
}

const LoadingBar = (props: LoadingBarProps) => (
    <LoaderContainer style={{display: props.completion == 0 || props.completion == 100 ? 'none' : 'block'}}>
        <LoadingCompletion style={{width: `${props.completion}%`}}>

        </LoadingCompletion>
    </LoaderContainer>
)

export default LoadingBar;