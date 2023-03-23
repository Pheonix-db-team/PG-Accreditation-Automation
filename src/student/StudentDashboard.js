import React from 'react';
import { useState, useEffect } from 'react';
import { getDocs, collection, setDoc, getDoc, doc, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigate, useLocation } from "react-router-dom";
//import { student_test_email } from "../App.js";
import AuthIssueComponent from '../components/AuthIssueComponent';
import Card from 'react-bootstrap/Card';
import '../App.css';
import img1 from '../image/NiTC1.png';
function StudentDashboard() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [student, setStudent] = useState({});
    async function subjectCESAv() {
        try {
            const subjectsRef = collection(db, "subject");
            const CES_Remaining_arr = [...state.student['CES_Remaining']];
            const today = new Date().setHours(0, 0, 0);
            console.log(student['Courses_Registered'])
            const query_x = query(subjectsRef, where("CourseExitSurveyAvailable", "==", true), where("SubjectID", "in", ['DS', 'CS101']),
                where("last_date", ">=", today),);
            const querySnapshot = await getDocs(subjectsRef);
            const fetched_sub_w_CES = []
            console.log("Responses")
            querySnapshot.forEach((doc) => {
                const data_here = doc.data();
                if (CES_Remaining_arr.includes(data_here['SubjectID'])) {
                    const date_here = new Date(0);
                    if (data_here['CourseExitSurveyAvailable'] && data_here['last_date']) {
                        const secs = data_here['last_date']['seconds']
                        date_here.setUTCSeconds(secs);
                        date_here.setHours(0, 0, 0);
                        if (today <= date_here) {
                            console.log("seconds " + date_here);
                            console.log(data_here['SubjectID']);
                            fetched_sub_w_CES.push(data_here);
                        }
                    }
                };
            });
        }
        catch (error) {
            alert("Data Fetch Issue⚠" + error.message);
            console.log(error.message);
        }
    }
    const fetchDetails = async () => {
        try {
            const data = await getDoc(doc(db, "Student", state.student['EmailID']));
            const filtered_data = data.data();
            console.log("Fetched data");
            console.log(filtered_data);
            setStudent(filtered_data);
        }
        catch (err) {
            console.error(err);
            alert("⚠" + err.message);
        }
    };
    useEffect((event) => {
        if (state) {
            setStudent(state.student);
        }
    }
        , []);
    function CESResponsePageNavigation() {
        console.log("CES Button tapped Calling navigation ")
        navigate('/studentcesresponse', { state: { student: state.student } });
    }
    const SubjectListPageNavigation = async () => {
        var filtered_data = [];
        try {
            const data = await getDocs(collection(db, "subject"));
            filtered_data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log(filtered_data);
        }
        catch (err) {
            console.error(err);
            alert("⚠" + err.message);
        }
        console.log("Subject List Page tapped Calling navigation ")
        navigate('/subjectlist', { state: { student: state.student, subject_arr: filtered_data } });
    }
    function CESResponsePageNavigation() {
        console.log("CES Button tapped Calling navigation ")
        navigate('/studentcesresponse', { state: { student: state.student } });
    }
    const CourseRegPageNavigation = async () => {
        var filtered_data = [];
        try {
            const data = await getDocs(collection(db, "subject"));
            filtered_data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log(filtered_data);
        }
        catch (err) {
            console.error(err);
            alert("⚠" + err.message);
        }
        console.log("course Reg Page tapped Calling navigation ")
        navigate('/studentcoursereg', { state: { student: state.student, subject_arr: filtered_data } });
    }
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await getDoc(doc(db, "Student", state.student.EmailID));
                const filtered_data = data.data();
                console.log("Fetched data");
                console.log(filtered_data);
                setStudent(filtered_data);
            }
            catch (err) {
                console.error(err);
                alert("⚠" + err.message);
            }

        };
        console.log("use Effect called");
        if (state) {
            setStudent(state.student);
            fetchDetails();
        }
    }
        , []);
    console.log(student);
    if (!(state)) {
        return (AuthIssueComponent());
    }
    return (
        <Card className='studentcard'>
            <div>
                <img className='showlogo' src={img1} width="15%" />
            </div>
            <body>
                <div className='stdDash'> <h2 className='center'><b>Student Dashboard</b></h2>

                    Name :{student['Name']}
                    <br></br>
                    Email :{student['EmailID']}
                    <br></br>
                    Department :{student['Department']}
                    <br></br>
                    <br></br>
                    Courses_Registered status:{(Array.isArray(student['Courses_Registered']) && student['Courses_Registered'].length) ? "✅" : "❌        "}
                    {(Array.isArray(student['Courses_Registered']) && student['Courses_Registered'].length) ? <button className='styledbutton' onClick={() => CESResponsePageNavigation()}>CES Available</button>
                        : <button className='styledbutton' onClick={() => CourseRegPageNavigation()}>Register for Courses</button>}
                    <br></br>

                    <br></br>
                    <button className='styledbutton1' onClick={() => SubjectListPageNavigation()}>CES Subjectwise</button>
                    <br></br>
                    <br></br>
                    <button className='styledbutton1' onClick={() => navigate(-1)}>Logout</button>
                    <br></br>
                </div >
            </body >
        </Card>
    )
}

export default StudentDashboard