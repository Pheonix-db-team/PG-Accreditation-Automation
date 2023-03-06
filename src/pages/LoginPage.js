import React from 'react'
import { useState } from 'react';
function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        //prevent redirect to oth. page
        event.preventDefault();
        alert("My Email is " + email + " Password is " + password);
        // spread syntax   commonly used to make shallow copies
    }
    return (
        <div>LoginPage
            <br></br>
            <form onSubmit={handleSubmit
            }>
                <div > Login</div>
                <div>Email</div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <div>Password</div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <input type="submit"></input>
            </form>

        </div>
    )
}

export default LoginPage