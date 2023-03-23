

import React from 'react'
import { useState, useEffect } from 'react';
//import "app.css"
function CESResponsePage() {

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
    console.log("option dict check " + optionsDict[0])
    const handleMultiRadioChange = (e, tag) => {
        const dict_temp = optionsDict;
        dict_temp[tag] = e.target.value;
        setOptionsDict(dict_temp);
        console.log(tag + " tag changed to " + optionsDict[tag]);
        // console.log("Set option called");
        //setOption(e.target.value)
    }
    return (
        <body>
            Questions
            {quesArr.map((ques, index) =>
                <div key={index} style={{ color: "red" }}>
                    <br></br>
                    Question tag: {ques['tag']}
                    <br></br>
                    {ques['question_prompt']}<br></br>
                    <label ><input type="radio" className="option-input radio" name={ques['tag']} value='A' defaultChecked={optionsDict[ques['tag']] === "A"} onChange={(e) => handleMultiRadioChange(e, ques['tag'])} />{ques['option_A']}</label>
                    <label ><input type="radio" name={ques['tag']} value='B' defaultChecked={optionsDict[ques['tag']] === "B"} onChange={(e) => handleMultiRadioChange(e, ques['tag'])} />{ques['option_B']}</label>
                    <label ><input type="radio" name={ques['tag']} value='C' defaultChecked={optionsDict[ques['tag']] === "C"} onChange={(e) => handleMultiRadioChange(e, ques['tag'])} />{ques['option_C']}</label>
                    <label ><input type="radio" name={ques['tag']} value='D' defaultChecked={optionsDict[ques['tag']] === "D"} onChange={(e) => handleMultiRadioChange(e, ques['tag'])} />{ques['option_D']}</label>

                    <br></br>
                </div>
            )
            }
        </body>

    );
}

export default CESResponsePage