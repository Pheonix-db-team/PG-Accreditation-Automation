import React from 'react'

function Greeting() {
    function sayHi(name) {
        alert('Hi ' + name);
    }
    return (
        <div>
            <button onClick={() => sayHi('Yugam')}>Say Hi</button>
        </div>
    )
}

export default Greeting