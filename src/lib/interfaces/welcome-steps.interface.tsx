export interface StepsProps {
    isVisible: boolean,
    nextStep: () => void,
    previousStep?: () => void,
    skipSteps?: () => void,
}