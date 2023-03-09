import React from 'react'
import { useState } from 'react';
function CheckBoxDemoPage() {

    const [isChecked, setIsChecked] = useState(false);
    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };
    return (
        <div>CheckBoxDemoPage
            <br></br>
            <input type="checkbox" id="topping" name="topping" value="Paneer" checked={isChecked}
                onChange={handleOnChange} />Paneer
            <div className="result">
                Above checkbox is {isChecked ? "checked" : "un-checked"}.
            </div>
        </div>
    )
}

export default CheckBoxDemoPage