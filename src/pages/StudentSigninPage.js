import React from 'react'
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../config/firebase'
import { useNavigate } from "react-router-dom";
import { getDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
function StudentSigninPage() {
    const navigate = useNavigate();
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
        const data = await getDoc(doc(db, "Student", email));
        const filtered_data = data.data();
        console.log("Fetched data");
        console.log(filtered_data);

        setEmail('');
        setPassword('');
        // navigate('/facultydashboard', { state: {} });
    }

    return (
        <div>
            <br></br>
            <form onSubmit={handleSubmit
            }>
                <div > Signin Student</div>
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

export default StudentSigninPage