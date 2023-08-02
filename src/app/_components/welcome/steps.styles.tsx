import { styled } from "styled-components";

const font1 = '"Montserrat", sans-serif';

export const StepOneContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const ButtonsContainer = styled.div`
    margin-top: 20px;
    margin-bottom: -100px;
    bottom: 15%;
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
`
interface CheckBoxWelcomeProps {
    ischecked: string,
}

export const CheckBoxContainer = styled.div<CheckBoxWelcomeProps>`
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    border-radius: 5px;
    background-color: ${(props) => props.ischecked == 'true' ? '#8ff1ab3a' : 'none'};
    border: 1px solid ${(props) => props.ischecked == 'true' ? '#34eb67' : 'black'};
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
    color: ${(props) => props.ischecked == 'true' ? '#1eee59' : 'black'};
    font-weight: 600;
`