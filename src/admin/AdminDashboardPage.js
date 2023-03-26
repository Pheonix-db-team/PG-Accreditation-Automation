import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import AuthIssueComponent from '../components/AuthIssueComponent';
import { getDocs, collection, setDoc, getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
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
            style={{ minHeight: '100vh', backgroundColor: '#81BEF7' }}
            
        >
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
<div className='dashback'>
        <img src={"logo-white.svg"} width="500" height="150" />
      </div>

      <body className='bodycolor'>
      <Card className='sitecardadmin' >
      <h2 class ="center"><b>ADMIN DASHBOARD</b></h2>
            

  
                <div class = "center">
                <button className='styledbutton' onClick={() => addStudentNavigation()}>
                    <i class="fa fa-user " aria-hidden="true" ></i>
                     Add Student
                </button>
                <br></br>                
                 <br></br>
                 <button className='styledbutton' onClick={() => addFacultyNavigation()}>
                    <i class="fa fa-user" aria-hidden="true"></i>
                     Add Faculty
                </button>
                <br></br>
                <br></br>
                {/* <br></br><br></br> */}
                <button className='styledbutton' onClick={() => addSubjectNavigation()}>
                    <i class="fa fa-book" aria-hidden="true"></i>
                     Add Subject
                </button>
                
                <br></br>
                <br></br>
                
                
                <button className='styledbutton' onClick={() => viewFacultyNavigation()}>
                    <i class="fa fa-table" aria-hidden="true"></i>
                    View Faculties
                </button>
                
                <br></br>
                <br></br>
                {/* <br></br><br></br> */}
                <button className='styledbutton' onClick={() => viewStudentNavigation()}>
                    <i class="fa fa-table" aria-hidden="true"></i>
                     View Students
                </button>
                
                <br></br>
                <br></br>
                {/* <br></br><br></br> */}
                <button className='styledbutton' onClick={() => navigate(-1)}>
                    <i class="fa fa-sign-out " aria-hidden="true"></i>
                    <span> Logout </span>
                </button>
                </div>


            
        </Card>
        </body>
        </Grid>
    );


}

export default AdminDashboardPage