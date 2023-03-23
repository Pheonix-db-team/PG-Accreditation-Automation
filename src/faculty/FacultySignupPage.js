import React from 'react'
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../config/firebase'
import { getDocs, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigate, useLocation } from "react-router-dom";
import { password_from_prop, email_from_prop, departments, isValidEmail } from "../App.js";
import AuthIssueComponent from '../components/AuthIssueComponent';
import Card from 'react-bootstrap/Card';
import '../App.css';
import img1 from '../image/NiTC1.png';
function FacultySignupPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const { state } = useLocation();
    const [password, setPassword] = useState("");
    const [facultyID, setFacultyID] = useState("");
    const [name, setName] = useState("");
    const [department, setDepartment] = useState(departments[0].value)
    useEffect(() => {
        const fetchListTest = async () => {
            //Read data
            try {
                const data = await getDocs(collection(db, "faculty"));
                const filtered_data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                console.log(filtered_data);
            }
            catch (err) {
                alert("⚠" + err.message);
                console.error(err);
            }

        }; fetchListTest();
    }
        , []);

    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!(email && email.length && email.match(isValidEmail))) {
            alert("Invalid email")
        }
        const docRefCheck = doc(db, "faculty", email);
        //var docRefcheck = db.collection("faculty").doc(email);
        var docSnap = ""
        try { docSnap = await getDoc(docRefCheck); } catch (e) {
            alert(e.message);
        }

        if (docSnap.exists()) {
            alert("Faculty email already exists")
            return -1;
            //console.log("Document data:", docSnap.data());
        }
        const docRef = await setDoc(doc(db, "faculty", email), {
            Courses_assigned: [], Department: department, EmailID: email,
            FacultyID: facultyID, Name: name
        });
        console.log(docRef);
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // console.log("You are " + userCredential.user.email);
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert("Error " + errorMessage);
            });
        console.log("Now you are " + auth.currentUser.email);
        await signInWithEmailAndPassword(auth, email_from_prop, password_from_prop)
            .then((userCredential) => {
            })
            .catch((error) => {
                alert("⚠" + error.message);

            });
        console.log("Finally You are " + auth.currentUser.email);
        alert("Added " + facultyID + " with name " + name);

        //  alert("Added " + enrolmentNo + " with name " + name)
        setEmail('');
        setPassword('');
        setFacultyID('');
        setDepartment('');
        setName('');
    }
    if (!(state && state.admin)) {
        return AuthIssueComponent();
    }

    return (
        <Card className='facultycard'>
            <div>
                <img className='showlogo' src={img1} width="15%" />
            </div>
            <div>
                <br></br>

                <br></br>
                <form onSubmit={handleSubmit
                }>
                    <div className='left_space_div'> <h2><b>Add Faculty</b></h2></div>
                    <br></br>
                    <div className='left_space_div'>Faculty ID:
                        <input type="text" value={facultyID} onChange={(e) => setFacultyID(e.target.value)} placeholder='must be unique' required></input>
                    </div>
                    <br></br>
                    <div className='left_space_div'>Faculty Name:
                        {/* <br></br> */}
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Faculty name' required></input>
                    </div>
                    <br></br>
                    {/* *Faculty ID must be unique */}
                    {department}

                    {/* {"⬇️ Select department ⬇️"} */}

                    <div className='left_space_div'>Select Department:
                        <select onChange={handleDepartmentChange}>

                            {departments.map((department) => <option key={department.label
                            } value={department.value}>{department.label}</option>)}
                        </select>
                    </div>
                    <br></br>
                    <div className='left_space_div'>Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required></input>
                    </div>
                    <br></br>
                    <div className='left_space_div'>Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required></input>
                    </div>
                    <br></br>
                    <div className='left_space_div'>

                    <input className='styledbutton' type="submit"></input>
                    <button className='styledbutton' onClick={() => navigate(-1)}>Back</button>
                    </div>
                </form>

            </div>
        </Card>
    )
}

export default FacultySignupPage