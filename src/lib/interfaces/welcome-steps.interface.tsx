export interface StepsProps {
    isVisible: boolean,
    forms: WelcomeForm,
    setForms: (arg: WelcomeForm) => void,
    nextStep: () => void,
    previousStep?: () => void,
    skipSteps?: () => void,
}

export interface StepOneProps {
    isVisible: boolean,
    nextStep: () => void,
}

export interface WelcomeForm {
    isConditionsAccepted: boolean,
    grantDataSavePermission: boolean,
    gender: string,
    country: string,
    age: number,
    height: number,
    weight: number,
    sports: string[],
}