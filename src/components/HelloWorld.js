import React from 'react'

function HelloWorld() {
    const greeting = "Hello World!!";
    const followup_greeting = "I am getting started with react";
    const num1 = 12;
    const num2 = 13;
    const link = "http://www.google.com"
    return (
        //in curly braces look for var else string
        //React functional component can only return only one ele
        <div>
            <div>{greeting}</div>
            <div>{followup_greeting}</div>
            <div> Computing {num1} + {num2} to {num1 + num2}</div>
            //internal link react router dom
            <a href={link}> Go to google</a>
        </div>
    )
}

export default HelloWorld