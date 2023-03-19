import React from 'react'
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../config/firebase'
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import Grid from '@mui/material/Grid'; 
import Card from 'react-bootstrap/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';



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
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)


            console.log("You are " + auth.currentUser.email);
            //  const data = await getDoc(doc(db, "faculty", "callmebyyourname"));

            const data = await getDoc(doc(db, "faculty", email));
            if (data.exists()) {
                const filtered_data = data.data();
                console.log("Fetched data @ signin page");
                console.log(filtered_data);
                setEmail('');
                setPassword('');
                navigate('/facultydashboard', { state: { fac: filtered_data, fac_email: email } });

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
    <Card > 

        <div>
             
            <br></br>
            <form onSubmit={handleSubmit
            }>
                <CardContent>
                 <Typography gutterBottom variant="h5" component="div">
                 Faculty Signin 
                </Typography>
                <br></br>
                <div>Email</div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Faculty Email" required></input>
                <div>Password</div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required ></input>
                <br></br>

                <div>
                <input type="submit"></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className='styledbutton' onClick={() => navigate(-1)}>Back</button>
                </div>
                </CardContent>
            </form>

        </div>
        </Card>
       </Grid>      
    </Grid> 
    )
}

export default FacultySigninPage