import { styled } from "styled-components";

const font1 = '"Montserrat", sans-serif';

export const StepOneContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const StepFourContainer = styled(StepOneContainer)`
    margin-top: 20px;
`

export const ButtonsContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`

export const FormsContainer = styled.form`
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 600px;
    column-gap: 8px;

    @media screen and (max-width: 700px) {
        width: 80%;
    }

`

export const FormsContainerStepsThree = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    column-gap: 8px;
`

export const FormsContainerGender = styled(FormsContainer)`
    flex-direction: row;
`

interface CheckBoxWelcomeProps {
    ischecked: string,
    bgcolor: string,
    bordercolor: string
}

const bordercolor = "#0572ffb5"
const bgcolor = "#8ff1ab3a"

export const CheckBoxContainer = styled.div<CheckBoxWelcomeProps>`
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    border-radius: 5px;
    background-color: ${(props) => props.ischecked == 'true' ? props.bgcolor : 'none'};
    border: 1px solid ${(props) => props.ischecked == 'true' ? props.bordercolor : 'black'};
    padding: 15px;
`


export const CheckBoxWelcome = styled.div<CheckBoxWelcomeProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    border-radius: 3px;
    border: 1px solid black;
    background-color: ${(props) => props.ischecked == 'true' ? '#12e94fae' : 'white'};
    cursor: pointer;
`

export const LabelWelcome = styled.label<CheckBoxWelcomeProps>`
    cursor: pointer;
    font-family: ${font1};
    color: ${(props) => props.ischecked == 'true' ? props.bordercolor : 'black'};
    font-weight: 600;
    flex: 1;
    @media screen and (max-width: 700px) {
        font-size: .8em;
    }
`

export const Select = styled.select`
    width: 100%;
    margin: 10px 0;
    padding: 12px;
    border: 1px solid black;
    background-color: white;
    border-radius: 5px;
    font-family: ${font1};
    font-size: 1em;
`

export const Option = styled.option`
    font-family: ${font1};
    font-size: 1.1em;
    height: 100px;
`

export const SelectContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
`

export const InputNumber = styled.input`
    margin: 10px 0;
    padding: 11px;
    font-size: 1.2em;
    border-radius: 5px;
    border: 1px solid black;
`

export const SportsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    @media screen and (max-width: 440px) {
        flex-direction: column;
    }
`

export const SportsCol = styled(SportsWrapper)`
    flex-direction: column;
`

interface SportsChoice {
    ischecked: string,
    bordercolor: string
}

export const SportsChoice = styled.div<SportsChoice>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 300px;
    padding: 15px;
    margin: 3px 5px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: ${props => props.ischecked};
    border: 1px solid ${props => props.bordercolor};
    cursor: pointer;

    @media screen and (max-width: 700px) {
        width: 200px;
    }

    @media screen and (max-width: 530px) {
        width: 150px;
    }

    @media screen and (max-width: 440px) {
        width: 200px;
    }

    span {
        font-family: ${font1};
        margin-left: 5px;
        font-weight: bold;
        color: ${props => props.bordercolor}
    }
`