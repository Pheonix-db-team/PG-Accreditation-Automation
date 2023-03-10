

import React from 'react'
import { useState, useEffect } from 'react';
function RadioButtonPage() {
    const arr = ['option1', 'option2', 'option3'];
    const [option, setOption] = useState(arr[0]);
    const handleRadioChange = (e) => {
        console.log("Set option called");
        setOption(e.target.value)
    }
    return (
        <body>

            <label >
                <input type="radio" name="myRadio" value="option1" defaultChecked={option === "option1"} onChange={handleRadioChange} />
                Option 1
            </label>
            <label>
                <input
                    type="radio"
                    name="myRadio"
                    value="option2"
                    defaultChecked={option === "option2"}
                    onChange={handleRadioChange}
                />
                Option 2
            </label>
            <label>
                <input type="radio" name="myRadio" value="option3" defaultChecked={option === "option3"}
                    onChange={handleRadioChange} />
                Option 3
            </label>
            <br></br>
            option is {option}

        </body>

    );
}

export default RadioButtonPage