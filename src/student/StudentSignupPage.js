import React from 'react'
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../config/firebase'
import { getDocs, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { password_from_prop, email_from_prop, departments, isValidEmail } from "../App.js";
import AuthIssueComponent from '../components/AuthIssueComponent';
import { useNavigate, useLocation } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import '../App.css';
import img1 from '../image/NiTC1.png';
//import {password_from_prop} from 
function StudentSignupPage() {
    // const password_from_prop = "test123";
    // const email_from_prop = "test1@gmail.com";
    // const departments = [
    //     { label: "COMPUTER SCIENCE AND ENGINEERING", value: "COMPUTER SCIENCE AND ENGINEERING" },
    //     { label: "ELECTRICAL ENGINEERING", value: "ELECTRICAL ENGINEERING" },
    //     { label: "MECHANICAL ENGINEERING", value: "MECHANICAL ENGINEERING" }

    // ]
    const navigate = useNavigate();
    const { state } = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [enrolmentNo, setEnrolmentNo] = useState("");
    const [name, setName] = useState("");
    const [department, setDepartment] = useState(departments[0].value)





    useEffect(() => {
        const fetchListTest = async () => {

            //Read data
            try {
                const data = await getDocs(collection(db, "Student"));

                const filtered_data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                console.log(filtered_data);

            }
            catch (err) {
                console.error(err);
                alert("⚠" + err.message);
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
            alert("Error invalid email");
            return -1;
        }
        const docRefCheck = doc(db, "Student", email);
        // const docRefCheck = doc(db, "Student", "test_z");
        var docSnap = ""
        try { docSnap = await getDoc(docRefCheck); } catch (e) {
            alert(e.message);
        }
        if (docSnap.exists()) {
            console.log(docSnap.data())
            alert("Student email already exists")
            return -1;
            //console.log("Document data:", docSnap.data());
        }
        const docRef = await setDoc(doc(db, "Student", email), {

            Courses_Registered: [], Department: department, EmailID: email,
            Enrolment_No: enrolmentNo, Name: name
        });


        //     "Courses_Registered": [
        //         "FIS",
        //         "Distt"
        //     ],
        //     "Department": "COMPUTER SCIENCE AND ENGINEERING",
        //     "Name": "Yugam Parashar",
        //     "Enrolment_No": "M220256CS",
        //     "id": "M220256CS"
        // }
        alert("Added " + enrolmentNo + " with name " + name);
        console.log(docRef);
        console.log("Added " + enrolmentNo + " with name " + name);

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // console.log("You are " + userCredential.user.email);

            })
            .catch((error) => {

                const errorMessage = error.message;
                alert("Error " + errorMessage);

                return -1;
            });
        console.log("Now you are " + auth.currentUser.email);
        await signInWithEmailAndPassword(auth, email_from_prop, password_from_prop)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;

                // ...
            })
            .catch((error) => {
                alert("⚠" + error.message);
                return -1;
                //const errorCode = error.code;
                //const errorMessage = error.message;
            });
        console.log("Finally You are " + auth.currentUser.email);

        setEmail('');
        setPassword('');
        setEnrolmentNo('');
        setDepartment('');
        setName('');

    }
    if (!(state && state.admin)) {
        return AuthIssueComponent();
    }
    return (
        <Card className='studentcard'>
            <div className='left_space_div'>
                <img className='showlogo' src={img1} width="15%" />
            </div>
            <div className='left_space_div'>
                <br></br>

                <br></br>
                <form onSubmit={handleSubmit
                }>
                    <div className='left_space_div' > <h2><b>Add Student</b></h2></div>
                    <br></br>
                    <div className='left_space_div'> Student ID:
                        <input type="text" value={enrolmentNo} onChange={(e) => setEnrolmentNo(e.target.value)} placeholder='  must be unique' required ></input>
                    </div>
                    <br></br>
                    <div className='left_space_div'>Student Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Student name' required ></input>
                    </div>
                    <br></br>
                    {department}

                    {/* {"⬇️ Select department ⬇️"} */}

                    <div className='left_space_div'>Selected department:
                        <select onChange={handleDepartmentChange}>

                            {departments.map((department) => <option key={department.label
                            } value={department.value}>{department.label}</option>)}
                        </select>
                    </div>
                    <br></br>
                    <div className='left_space_div'>Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required ></input>
                    </div>
                    <br></br>
                    <div className='left_space_div'>Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required ></input>
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

export default StudentSignupPage