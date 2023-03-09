import React from 'react'
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../config/firebase'
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
function FacultySigninPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fac, setFac] = useState({});
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

        const data = await getDoc(doc(db, "faculty", email));
        //const data = await getDoc(collection(db, "faculty", "testmsd@gmail.com"));

        const filtered_data = data.data();
        console.log("Fetched data");
        console.log(filtered_data);
        setFac(JSON.parse(JSON.stringify(filtered_data)));
        // console.log("Fac set");
        // console.log(fac);

        navigate('/facultydashboard', { state: { fac: filtered_data, fac_email: email } });
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