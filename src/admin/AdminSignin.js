import React from 'react'
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../config/firebase'
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
 
import Card from 'react-bootstrap/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid'; 
import { grey } from '@mui/material/colors';
//Css
import Admin from '../css/Admin.css';
import img1  from '../image/NiTC1.png';

 
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
    <Card className='AdminCard' >
    <div>
    <div>
        <img className='showlogo' src={img1} width="15%" />
    </div>
         <div >
            {/* <br></br> */}
            <form onSubmit={handleSubmit
            }>
     
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Admin Signin 
                </Typography>
               
                <div>
                    Email: 
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin Email" required></input>
                </div>
                <br></br>
                
                <div>
                Password: 
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required ></input>
                </div>
                <br></br>
                <div>
                <input type="submit"></input> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className='styledbutton' onClick={() => navigate(-1)}>Back</button>
                </div> 
             </CardContent>
            <br></br>
        </form>

        </div>
        </div>
    </Card>
    </Grid>      
 </Grid>
  
    )
}

export default AdminSigninPage