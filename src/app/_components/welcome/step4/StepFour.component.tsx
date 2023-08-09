import { StepsProps } from "@/lib/interfaces/welcome-steps.interface";
import { ButtonsContainer, InputNumber, SelectContainer, SportsWrapper, SportsCol, SportsChoice, StepFourContainer } from "../steps.styles";
import { ButtonBase, ButtonInverted } from "@/app/GlobalStyles.styles";
import { HeaderSteps, SubHeaderSteps } from "@/app/welcome/welcome.styles";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { MdSportsSoccer, MdSportsVolleyball, MdSportsBasketball, MdSportsTennis, MdSportsHandball, MdMore } from 'react-icons/md'
import { GiWaterPolo } from 'react-icons/gi'
import { BiSwim } from 'react-icons/bi'



export default function StepFour(props: StepsProps) {
    const { forms, isVisible, nextStep, setForms, previousStep } = props
    const [array, setArray] = useState<string[]>([]);
    const selectedBorderColor = "#0572ffb5";
    const selectedBgColor = "#0586ff29";

    const handleSubmit = () => {
        setForms({...forms, sports: array})
        nextStep();
    }

    const handleClick = (sport: string) => {
        if (array.includes(sport)) {
            setArray(array.filter((element) => element != sport));
            return;
        }

        const newArray = [...array, sport]
        setArray(newArray);
    }

    const checkIsChecked = (id: string) => {
        if (array.includes(id)) {
            return "#0586ff29";
        } else return 'none'
    }

    const handleOnChangeWeight = (e: ChangeEvent<HTMLInputElement>) => setForms({...forms, weight: parseInt(e.target.value)})

    const handleOnChangeHeight = (e: ChangeEvent<HTMLInputElement>) => setForms({...forms, height: parseInt(e.target.value)})

    return (
        <StepFourContainer style={{display: isVisible ? 'flex' : 'none'}}>

            <HeaderSteps>Your stats</HeaderSteps>
            <SubHeaderSteps>All of these information are optional and can be skipped</SubHeaderSteps>

            <div style={{width: '100%', display: 'flex', columnGap: '10px'}}>
                <SelectContainer>
                    <SubHeaderSteps style={{width: '100%', marginBottom: '-5px'}}>What&apos;s your weight?</SubHeaderSteps>
                    <InputNumber type="number" name="agenumber" id="age" max={300} min={30} placeholder="In Kgs" onChange={handleOnChangeWeight}/>
                </SelectContainer>
                <SelectContainer>
                    <SubHeaderSteps style={{width: '100%', marginBottom: '-5px'}}> What&apos;s your height? </SubHeaderSteps>
                    <InputNumber type="number" name="agenumber" id="age" max={250} min={50} placeholder="In centimeters" onChange={handleOnChangeHeight}/>
                </SelectContainer>
            </div>


            <SubHeaderSteps>Choose the sports you practice</SubHeaderSteps>
            <SportsWrapper>
                <SportsCol>

                    <SportsChoice bordercolor={array.includes('soccer') ? selectedBorderColor : 'none'} ischecked={array.includes('soccer') ? selectedBgColor : 'none'} id="soccer" onClick={() => handleClick("soccer")}>
                        <MdSportsSoccer/>
                        <span onClick={() => handleClick("soccer")}>Soccer</span>
                    </SportsChoice>
                    <SportsChoice bordercolor={array.includes('water_polo') ? selectedBorderColor : 'none'} ischecked={array.includes('water_polo') ? selectedBgColor : 'none'} id="water_polo" onClick={() => handleClick("water_polo")}>
                        <GiWaterPolo/>
                        <span>Water polo</span>
                    </SportsChoice>
                    <SportsChoice bordercolor={array.includes('volleyball') ? selectedBorderColor : 'none'} ischecked={array.includes('volleyball') ? selectedBgColor : 'none'} id="volleyball" onClick={() => handleClick("volleyball")}>
                        <MdSportsVolleyball/>
                        <span>Volleyball</span>
                    </SportsChoice>
                    <SportsChoice bordercolor={array.includes('basketball') ? selectedBorderColor : 'none'} ischecked={array.includes('basketball') ? selectedBgColor : 'none'} id="basketball" onClick={() => handleClick("basketball")}>
                        <MdSportsBasketball/>
                        <span>Basketball</span>
                    </SportsChoice>

                </SportsCol>

                <SportsCol>

                    <SportsChoice bordercolor={array.includes('tennis') ? selectedBorderColor : 'none'} ischecked={array.includes('tennis') ? selectedBgColor : 'none'} id="tennis" onClick={() => handleClick("tennis")}>
                        <MdSportsTennis/>
                        <span onClick={() => handleClick("tennis")}>Tennis</span>
                    </SportsChoice>
                    <SportsChoice bordercolor={array.includes('swimming') ? selectedBorderColor : 'none'} ischecked={array.includes('swimming') ? selectedBgColor : 'none'} id="swimming" onClick={() => handleClick("swimming")}>
                        <BiSwim/>
                        <span>Swimming</span>
                    </SportsChoice>
                    <SportsChoice bordercolor={array.includes('handball') ? selectedBorderColor : 'none'} ischecked={array.includes('handball') ? selectedBgColor : 'none'} id="handball" onClick={() => handleClick("handball")}>
                        <MdSportsHandball/>
                        <span>Handball</span>
                    </SportsChoice>
                    <SportsChoice bordercolor={array.includes('other') ? selectedBorderColor : 'none'} ischecked={array.includes('other') ? selectedBgColor : 'none'} id="other" onClick={() => handleClick("other")}>
                        <MdMore/>
                        <span>Others...</span>
                    </SportsChoice>

                </SportsCol>
            </SportsWrapper>


            <ButtonsContainer>
                <ButtonBase onClick={previousStep}>Previous</ButtonBase>
                <ButtonInverted onClick={handleSubmit}>Next</ButtonInverted>
            </ButtonsContainer>
        </StepFourContainer>
    )
}