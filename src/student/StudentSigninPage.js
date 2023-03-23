import React from 'react'
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from '../config/firebase'
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import Grid from '@mui/material/Grid';
import Card from 'react-bootstrap/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
//Css
import Admin from '../css/Student.css';
import img1 from '../image/NiTC1.png';

function StudentSigninPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            alert("⚠" + error.message);
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
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
            bgcolor='grey'
        >
            <Grid item xs={3}>
                <Card className='StudentCard' >
                    <div>
                        <div>
                            <img className='showlogo' src={img1} width="15%" />
                        </div>
                        <div>

                            <form onSubmit={handleSubmit
                            }>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Student Signin
                                    </Typography>

                                    <div>Email:
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Student Email" required ></input>
                                    </div>
                                    <br></br>
                                    <div>Password:
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required ></input>
                                    </div>
                                    <br></br>

                                    <div>
                                        <input type="submit" className='styledbutton'></input>
                                        <button className='styledbutton' onClick={() => navigate(-1)}>Back</button>
                                    </div>
                                </CardContent>
                            </form>
                        </div>
                    </div>
                </Card>
            </Grid>
        </Grid>
    )
}

export default StudentSigninPage