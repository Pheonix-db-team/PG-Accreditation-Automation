import React from 'react'
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../config/firebase'
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
function AdminSigninPage() {
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
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)


            console.log("You are " + auth.currentUser.email);
            //  const data = await getDoc(doc(db, "faculty", "callmebyyourname"));

            const data = await getDoc(doc(db, "admin", email));
            if (data.exists()) {
                const filtered_data = data.data();
                console.log("Fetched data @ signin page");
                console.log(filtered_data);
                setEmail('');
                setPassword('');
                navigate('/admindashboard', { state: { admin: email } });

            } else {

                // doc.data() will be undefined in this case
                console.log("No such document!");
                const error_db = new Error("Not found in faculty record")
                error_db.code = "Faculty RECORD 404"
                throw error_db;
            }
            // const filtered_data = data.data();
            // console.log("Fetched data");
            // console.log(filtered_data);
            // setFac(JSON.parse(JSON.stringify(filtered_data)));
            // console.log("Fac set");
            // console.log(fac);

        }
        catch (error) {
            console.log(error.code)
            alert("Signin Issue⚠" + error.message);
            //   const errorCode = error.code;
            //   const errorMessage = error.message;
        }
        setEmail('');
        setPassword('');

    }


    return (
        <div>
            <br></br>
            <form onSubmit={handleSubmit
            }>
                <div > Signin Admin</div>
                <br></br>
                <div>Email</div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                <div>Password</div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required ></input>
                <br></br>

                <input type="submit"></input>
            </form>

        </div>
    )
}

export default AdminSigninPage