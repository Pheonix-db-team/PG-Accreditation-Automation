import React from 'react'
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from '../config/firebase'
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import Card from 'react-bootstrap/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import img1 from '../image/NiTC1.png';
import ParticlesBg from 'particles-bg'

function StudentSigninPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // useEffect(() => {
    //     signOut(auth).then(() => {
    //         // Sign-out successful.
    //     }).catch((error) => {
    //         alert("⚠" + error.message);
    //         // An error happened.
    //     });
    // }
    //     , []);
    const handleSubmit = async (event) => {

        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            console.log(userCredential)
            console.log("You are " + auth.currentUser.email);
            const data = await getDoc(doc(db, "Student", email));

            if (data.exists()) {
                const filtered_data = data.data();
                console.log("Fetched data @ signin page");
                console.log(filtered_data);
                setEmail('');
                setPassword('');
                navigate('/studentdashboard', { state: { student: filtered_data, } });
            } else {

                // doc.data() will be undefined in this case
                console.log("No such document!");
                const error_db = new Error("Not found student record")
                error_db.code = "STUDENT RECORD 404"
                throw error_db;
            }

        }
        catch (error) {
            console.log(error.code)
            alert("Signin Issue⚠" + error.message);
            //   const errorCode = error.code;
            //   const errorMessage = error.message;
        }
    }

    return (
<div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
<ParticlesBg type="circle" bg={true} />
<div style={{
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '1rem'
  }}>

            <Card className='logincard' style={{
                width: '100%',
                maxWidth: '400px',
                padding: '1.5rem',
                boxSizing: 'border-box',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>


                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <img className='showlogo' src={img1} alt="Logo" style={{ maxWidth: '80%', width: '120%', height: 'auto' }} />
                </div>

                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align="center">
                            Student Login
                        </Typography>

                        <div style={{ marginBottom: '1rem' }}>
                            <b>Email:</b><br />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Student Email"
                                required
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <b>Password:</b><br />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <input
                                type="submit"
                                className='styledbutton'
                                value="Sign In"
                                style={{ padding: '0.5rem 1.5rem', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
                            />

                            <button
                                className='styledbutton'
                                onClick={() => navigate(-1)}
                                style={{ padding: '0.5rem 1.5rem', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
                            >
                                Back
                            </button>
                        </div>
                    </CardContent>
                </form>
            </Card>
        </div>
        </div>
    )
}

export default StudentSigninPage
