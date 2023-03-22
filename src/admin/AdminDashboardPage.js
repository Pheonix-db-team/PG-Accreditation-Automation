import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import AuthIssueComponent from '../components/AuthIssueComponent';
import { getDocs, collection, setDoc, getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import Admin from '../css/Admin.css';
import { Card, Grid } from '@mui/material';

function AdminDashboardPage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    function addStudentNavigation() {
        console.log("add student tapped Calling navigation ")
        navigate('/studentsignup', { state: { admin: state.admin } });

    }
    function addFacultyNavigation() {
        console.log("add faculty tapped Calling navigation ")
        navigate('/facultysignup', { state: { admin: state.admin } });

    }
    const addSubjectNavigation = async () => {
        var filtered_data = [];
        try {
            const data = await getDocs(collection(db, "faculty"));
            filtered_data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log(filtered_data);
        }
        catch (err) {
            console.error(err);
            alert("⚠" + err.message);
        }
        console.log("Subject List Page tapped Calling navigation ")
        navigate('/addsubject', { state: { admin: state.admin, faculty_arr: filtered_data } });
        // navigate('/subjectlist', { state: { student: state.student, subject_arr: filtered_data } });
    }
    const viewFacultyNavigation = async () => {
        var filtered_data = [];
        try {
            const data = await getDocs(collection(db, "faculty"));
            filtered_data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log(filtered_data);
        }
        catch (err) {
            console.error(err);
            alert("⚠" + err.message);
        }
        console.log("Subject List Page tapped Calling navigation ")
        navigate('/viewfacultylist', { state: { admin: state.admin, faculty_arr: filtered_data } });
        // navigate('/subjectlist', { state: { student: state.student, subject_arr: filtered_data } });
    }
    const viewStudentNavigation = async () => {
        var filtered_data = [];
        try {
            const data = await getDocs(collection(db, "Student"));
            filtered_data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log(filtered_data);
        }
        catch (err) {
            console.error(err);
            alert("⚠" + err.message);
        }
        navigate('/viewstudentlist', { state: { admin: state.admin, student_arr: filtered_data } });
        // navigate('/subjectlist', { state: { student: state.student, subject_arr: filtered_data } });
    }
    if (!(state && state.admin)) {
        return AuthIssueComponent();
    }
    return (
        <Grid  
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
        bgcolor='white'
        >
        <body className='buttonshifting'>
            
   
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>


        
        <button className='styledbutton' onClick={() => addStudentNavigation()}>
        <i class="fa fa-user " aria-hidden="true" ></i>
        <span> Add Student</span>
        </button>
        {/* <br></br><br></br> */}
        <button className='styledbutton' onClick={() => addFacultyNavigation()}>
        <i class="fa fa-user" aria-hidden="true"></i>
        <span> Add Faculty</span>
        </button>
        {/* <br></br><br></br> */}
        <button className='styledbutton' onClick={() => addSubjectNavigation()}>
        <i class="fa fa-book" aria-hidden="true"></i>
        <span> Add Subject</span>
        </button>
        {/* <br></br><br></br> */}
        <button className='styledbutton' onClick={() => viewFacultyNavigation()}>
        <i class="fa fa-table" aria-hidden="true"></i>
        <span> View Faculties</span>
        </button>
        {/* <br></br><br></br> */}
        <button className='styledbutton' onClick={() => viewStudentNavigation()}>
        <i class="fa fa-table" aria-hidden="true"></i>
        <span> View Students</span>
        </button>
        {/* <br></br><br></br> */}
        <button className='styledbutton' onClick={() => navigate(-1)}>
        <i class="fa fa-sign-out "  aria-hidden="true"></i>
        <span> Logout </span>
        </button>

    
          
        </body>
        </Grid>
    );


}

export default AdminDashboardPage