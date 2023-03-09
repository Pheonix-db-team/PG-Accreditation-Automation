import React from 'react'
import { useState } from 'react';
function CheckBoxDemoPage() {
    const toppings = [
        {
            name: "Capsicum",
            price: 1.2
        },
        {
            name: "Paneer",
            price: 2.0
        },
        {
            name: "Red Paprika",
            price: 2.5
        },
        {
            name: "Onions",
            price: 3.0
        },
        {
            name: "Extra Cheese",
            price: 3.5
        },
        {
            name: "Baby Corns",
            price: 3.0
        },
        {
            name: "Mushroom",
            price: 2.0
        }
    ];
    const getFormattedPrice = (price) => `$${price.toFixed(2)}`;
    const [checkedState, setCheckedState] = useState(
        new Array(toppings.length).fill(false)
        // fill array size w false
    );
    const [total, setTotal] = useState(0);
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item);
        setCheckedState(updatedCheckedState);
        const totalPrice = updatedCheckedState.reduce((sum, currentState, index) => { if (currentState === true) { return sum + toppings[index].price; } return sum; }, 0);
        setTotal(totalPrice);
    };
    return (
        <div>CheckBoxDemoPage
            <br></br>
            <ul >
                {toppings.map(({ name, price }, index) => {
                    return (
                        <li key={index}>
                            <div>
                                <div >
                                    <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={name}
                                        value={name}
                                        checked={checkedState[index]}
                                        onChange={() => handleOnChange(index)}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                </div>
                                <div className="right-section">{getFormattedPrice(price)}</div>
                            </div>
                        </li>
                    );
                })}
                <li>
                    <div >
                        <div >Total:</div>
                        <div >{getFormattedPrice(total)}</div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default CheckBoxDemoPage