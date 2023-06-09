import React from 'react'
//multi prop
function HelloWorld({ propnum, propstr }) {
    //add props argument
    const greeting = "Hello World!!";
    const followup_greeting = "I am getting started with react";
    const num1 = 12;
    const num2 = 13;
    const link = "http://www.google.com";
    const myStyle = { backgroundColor: 'cornsilk', padding: '10px', fontSize: '20px' };
    return (
        //in curly braces look for var else string
        //React functional component can only return only one ele
        //  <div> Computing {num1} + {num2} to {num1 + num2}</div>
        <div style={myStyle}>
            <div>{greeting}</div>
            <div>{followup_greeting}</div>
            <div> Props passed num is {propnum}</div>
            <div> Props passed str is {propstr}</div>

            //internal link react router dom
            <a href={link}> Go to google</a>
        </div>
    )
}

export default HelloWorld