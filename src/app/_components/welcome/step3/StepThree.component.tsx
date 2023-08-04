import { StepsProps } from "@/lib/interfaces/welcome-steps.interface";
import { HeaderSteps, SubHeaderSteps } from "@/app/welcome/welcome.styles";
import { StepOneContainer, ButtonsContainer, CheckBoxContainer, LabelWelcome, FormsContainer, FormsContainerStepsThree, Select, Option, SelectContainer, InputNumber } from "../steps.styles";
import { ButtonBase, ButtonInverted, ErrorBox } from "@/app/GlobalStyles.styles";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { FaFlag } from "react-icons/fa";

import enLocale from "i18n-iso-countries/langs/en.json"
import countries from "i18n-iso-countries"
import { ChangeEvent, useState } from "react";
import { error } from "console";

export default function StepThree(props: StepsProps) {
    const [errorStates, setErrorStates] = useState({ country: false, age: false, });
    const { isVisible, nextStep, previousStep, forms, setForms } = props;
    countries.registerLocale(enLocale);
    const countryObj = countries.getNames("en", { select: "official" });

    const countryArr = Object.entries(countryObj).map(([key, value]) => {
        return {
            label: value,
            value: key,
        }
    })
    
    const handleSubmit = () => {
        if (forms.age < 14 || forms.age > 100) {
            setErrorStates({ country: false, age: true});
            return;
        }

        if (forms.country === '') {
            setErrorStates({ country: true, age: false })
            return;
        }


        nextStep();
    }

    const handleOnChangeAge = (e: ChangeEvent<HTMLInputElement>) => {
        setForms({...forms, age: parseInt(e.target.value)})
    }

    const selectedBorderColor = "#0572ffb5";
    const selectedBgColor = "#0586ff29";

    return (
        <StepOneContainer style={{display: isVisible ? 'flex' : 'none'}}>
            <HeaderSteps>Complete your profile</HeaderSteps>

            <FormsContainer>
                <SubHeaderSteps style={{width: '100%', marginBottom: '-5px'}}>
                    Choose your gender:
                </SubHeaderSteps>
                <FormsContainerStepsThree>
                    <CheckBoxContainer
                        ischecked={`${forms.gender == 'M' ? true : false}`}
                        bordercolor={`${selectedBorderColor}`} 
                        bgcolor={`${selectedBgColor}`} 
                        onClick={() => setForms({...forms, gender: 'M'})}
                    >
                        <BsGenderMale style={{marginRight: "5px"}}/>
                        <LabelWelcome
                            ischecked={`${forms.gender == 'M' ? true : false}`}
                            bordercolor={`${selectedBorderColor}`} 
                            bgcolor={`${selectedBgColor}`}
                        >
                                Male
                        </LabelWelcome>

                    </CheckBoxContainer>


                    <CheckBoxContainer 
                        ischecked={`${forms.gender == 'F' ? true : false}`}
                        bordercolor={`${selectedBorderColor}`} 
                        bgcolor={`${selectedBgColor}`} 
                        onClick={() => setForms({...forms, gender: 'F'})}
                    >
                        <BsGenderFemale style={{marginRight: "5px"}}/>

                        <LabelWelcome 
                            ischecked={`${forms.gender == 'F' ? true : false}`}
                            bordercolor={`${selectedBorderColor}`} 
                            bgcolor={`${selectedBgColor}`}
                            >
                                Female
                        </LabelWelcome>

                    </CheckBoxContainer>
                </FormsContainerStepsThree>


            <div style={{width: '100%', display: 'flex', columnGap: '10px'}}>
                <SelectContainer>
                    <SubHeaderSteps style={{width: '100%', marginBottom: '-5px'}}>
                        Choose your country:
                    </SubHeaderSteps>
                    <Select
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setForms({...forms, country: e.target.value})}
                    >
                        <Option defaultChecked value="">-- Select --</Option>
                        {countryArr.map((country, index) => {
                            return <Option key={index} value={country.value}>{country.label}</Option>
                        })}
                    </Select>
                </SelectContainer>
                <SelectContainer>
                    <SubHeaderSteps style={{width: '100%', marginBottom: '-5px'}}>
                        How old are you?
                    </SubHeaderSteps>
                    <InputNumber type="number" name="agenumber" id="age" max={100} min={14} onChange={handleOnChangeAge}/>
                </SelectContainer>
            </div>
                

            </FormsContainer>

            <ErrorBox style={{display: errorStates.age ? 'block' : 'none'}}>Please enter a valid age</ErrorBox>
            <ErrorBox style={{display: errorStates.country ? 'block' : 'none'}}>Please enter a valid country</ErrorBox>

            <ButtonsContainer>
                <ButtonBase onClick={previousStep}>Previous</ButtonBase>
                <ButtonInverted onClick={handleSubmit}>Next</ButtonInverted>
            </ButtonsContainer>
        </StepOneContainer>
    )
}