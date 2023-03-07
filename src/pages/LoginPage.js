import React from 'react'
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from '../config/firebase';
function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        //prevent redirect to oth. page
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {


                // Signed in 
                const user = userCredential.user;
                console.log("Logged in " + user.email);
                const user_email = user.email;
                //<Link to="/blog" state={{ some: "value I passed" }} style={{ textDecoration: 'none', color: 'white' }} >Blog</Link>
                console.log("Routing done");
                navigate('/dashboard', { state: { user_email: user_email } });
                // alert("Login " + user.email);
                // ...
            })
            .catch((error) => {
                //const errorCode = error.code;
                const errorMessage = error.message;
                alert("Error " + errorMessage);

                // ..
            });

    }
    return (
        <div>Login
            Page
            <br></br>
            <form onSubmit={handleSubmit
            }>
                <div >Login</div>
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

export default LoginPage