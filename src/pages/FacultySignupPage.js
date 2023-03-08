import React from 'react'
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../config/firebase'
//Department Array in app.js
function FacultySignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [facultyID, setFacultyID] = useState("");
    const [name, setName] = useState("");

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
        <div>
            <br></br>
            <form onSubmit={handleSubmit
            }>
                <div > Signup Faculty</div>
                <br></br>
                Faculty ID
                <br></br>
                <input type="text" value={facultyID} onChange={(e) => setFacultyID(e.target.value)}></input>
                <br></br>
                Faculty Name
                <br></br>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                <br></br>
                *Faculty ID must be unique
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

export default FacultySignupPage