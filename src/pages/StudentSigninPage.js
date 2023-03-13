import React from 'react'
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from '../config/firebase'
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
function StudentSigninPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }
        , []);
    const handleSubmit = async (event) => {

        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            console.log("You are " + auth.currentUser.email);
            const data = await getDoc(doc(db, "Student", email));
            const filtered_data = data.data();
            console.log("Fetched data");
            console.log(filtered_data);

            setEmail('');
            setPassword('');
            navigate('/studentdashboard', { state: { student: filtered_data, } });
        }
        catch (error) {
            console.log(error.code)
            alert("Signin Issue⚠" + error.message);
            //   const errorCode = error.code;
            //   const errorMessage = error.message;
        }
    }

    return (
        <div>
            <br></br>
            <form onSubmit={handleSubmit
            }>
                <div > Signin Student</div>
                <br></br>
                <div>Email</div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required ></input>
                <div>Password</div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required ></input>
                <br></br>

                <input type="submit"></input>
            </form>

        </div>
    )
}

export default StudentSigninPage