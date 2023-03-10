

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

    const [option, setOption] = useState(arr[0]);
    const handleRadioChange = (e) => {
        console.log("Set option called");
        setOption(e.target.value)
    }
    return (
        <body>
            {ques['question_prompt']}<br></br>
            <label ><input type="radio" name={ques['tag']} value={ques['option_A']} defaultChecked={option === ques['option_A']} onChange={handleRadioChange} />{ques['option_A']}</label>
            <label ><input type="radio" name={ques['tag']} value={ques['option_B']} defaultChecked={option === ques['option_B']} onChange={handleRadioChange} />{ques['option_B']}</label>
            <label ><input type="radio" name={ques['tag']} value={ques['option_C']} defaultChecked={option === ques['option_C']} onChange={handleRadioChange} />{ques['option_C']}</label>
            <label ><input type="radio" name={ques['tag']} value={ques['option_D']} defaultChecked={option === ques['option_D']} onChange={handleRadioChange} />{ques['option_D']}</label>

            <br></br>
            option is {option}

        </body>

    );
}

export default RadioButtonPage