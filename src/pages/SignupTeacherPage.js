import React from 'react'
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../config/firebase'
function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [facultyID, setFacultyID] = useState("");
    //const [department, setDepartment] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("Signed up " + user.email);

            })
            .catch((error) => {

                const errorMessage = error.message;
                alert("Error " + errorMessage);


            });


    }
    return (
        <div>Signup
            Page
            <br></br>
            <form onSubmit={handleSubmit
            }>
                <div > Signup Teacher</div>
                <br></br>
                <div>Email</div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <div>Password</div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <br></br>
                Faculty ID must be unique
                <br></br>
                <input type="Faculty ID" value={facultyID} onChange={(e) => setFacultyID(e.target.value)}></input>
                <br></br>
                <input type="submit"></input>
            </form>

        </div>
    )
}

export default SignupPage