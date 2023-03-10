

import React from 'react'
import { useState, useEffect } from 'react';
function RadioButtonPage() {
    const arr = ['option1', 'option2', 'option3'];
    const ques = {
        question_prompt: "How was the course",
        option_A: "Poor",
        option_B: "Satisfactory",
        option_C: "Good",
        option_D: "Very Good",
        tag: 0
    }
    const quesArr = [{
        question_prompt: "How was the course",
        option_A: "Poor",
        option_B: "Satisfactory",
        option_C: "Good",
        option_D: "Very Good",
        tag: 0
    },
    {
        question_prompt: "How confident are you of course outcomes",
        option_A: "Poor",
        option_B: "Satisfactory",
        option_C: "Good",
        option_D: "Very Good",
        tag: 1
    }]
    const option_selected_dict = {};
    quesArr.map((ques, key) => {
        option_selected_dict[ques['tag']] = 'A';//Initially all As
    })
    const [optionsDict, setOptionsDict] = useState(option_selected_dict);
    //console.log("options dict " + optionsDict[0]);
    // setOptionsArr(option_selected_arr);
    const [option, setOption] = useState(ques['option_A']);
    const handleRadioChange = (e, index) => {
        console.log("Index in radio changed " + index);
        // console.log("Set option called");
        setOption(e.target.value)
    }
    const handleMultiRadioChange = (e, tag) => {
        const dict_temp = optionsDict;
        dict_temp[tag] = e.target.value;
        setOptionsDict(dict_temp);
        console.log(tag + " tag changed to " + optionsDict[tag]);
        // console.log("Set option called");
        //setOption(e.target.value)
    }
    const index_test = 0;
    return (
        <body>
            {ques['question_prompt']}<br></br>
            <label ><input type="radio" name={ques['tag']} value={ques['option_A']} defaultChecked={option === ques['option_A']} onChange={(e) => handleRadioChange(e, index_test + 1)} />{ques['option_A']}</label>
            <label ><input type="radio" name={ques['tag']} value={ques['option_B']} defaultChecked={option === ques['option_B']} onChange={(e) => handleRadioChange(e, index_test + 2)} />{ques['option_B']}</label>
            <label ><input type="radio" name={ques['tag']} value={ques['option_C']} defaultChecked={option === ques['option_C']} onChange={(e) => handleRadioChange(e, index_test + 3)} />{ques['option_C']}</label>
            <label ><input type="radio" name={ques['tag']} value={ques['option_D']} defaultChecked={option === ques['option_D']} onChange={(e) => handleRadioChange(e, index_test + 4)} />{ques['option_D']}</label>

            <br></br>
            option is {option}
            Questions
            {quesArr.map((ques, index) =>
                <div key={index}>
                    <br></br>
                    Question tag: {ques['tag']}
                    <br></br>
                    {ques['question_prompt']}<br></br>
                    <label ><input type="radio" name={ques['tag']} value={'A'} defaultChecked={optionsDict[ques['tag']] === 'A'} onChange={(e) => handleMultiRadioChange(e, ques['tag'])} />{ques['option_A']}</label>
                    <label ><input type="radio" name={ques['tag']} value={'B'} defaultChecked={optionsDict[ques['tag']] === 'B'} onChange={(e) => handleMultiRadioChange(e, ques['tag'])} />{ques['option_B']}</label>
                    <label ><input type="radio" name={ques['tag']} value={'C'} defaultChecked={optionsDict[ques['tag']] === 'C'} onChange={(e) => handleMultiRadioChange(e, ques['tag'])} />{ques['option_C']}</label>
                    <label ><input type="radio" name={ques['tag']} value={'D'} defaultChecked={optionsDict[ques['tag']] === 'D'} onChange={(e) => handleMultiRadioChange(e, ques['tag'])} />{ques['option_D']}</label>

                    <br></br>
                </div>
            )
            }
        </body>

    );
}

export default RadioButtonPage