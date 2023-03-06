import React from 'react'
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
//import { initializeApp } from "firebase/app";
import { auth } from '../config/firebase'
function SignupPage() {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        //prevent redirect to oth. page
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {


                // Signed up
                const user = userCredential.user;
                alert("Signed up " + user.email);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Error " + errorMessage);

                // ..
            });


    }
    return (
        <div>Signup
            Page
            <br></br>
            <form onSubmit={handleSubmit
            }>
                <div > Signup</div>
                <br></br>
                <div>Email</div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <div>Password</div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <br></br>
                <input type="submit"></input>
            </form>

        </div>
    )
}

export default SignupPage