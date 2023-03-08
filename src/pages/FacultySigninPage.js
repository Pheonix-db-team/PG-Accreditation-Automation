import React from 'react'
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../config/firebase'
function FacultySigninPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        //No Need
    }
        , []);
    const handleSubmit = async (event) => {

        event.preventDefault();
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;

                // ...
            })
            .catch((error) => {
                //   const errorCode = error.code;
                //   const errorMessage = error.message;
            });
        console.log("You are " + auth.currentUser.email);

        setEmail('');
        setPassword('');

    }

    return (
        <div>
            <br></br>
            <form onSubmit={handleSubmit
            }>
                <div > Signin Faculty</div>
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

export default FacultySigninPage