import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import AuthIssueComponent from '../components/AuthIssueComponent';
import { getDocs, collection, setDoc, getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Card, Grid } from '@mui/material';
import ParticlesBg from 'particles-bg'

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
      style={{
        minHeight: '100vh',
        margin: 0,
        background: 'linear-gradient(135deg, #103e82 0%, #0c2e66 100%)',
        padding: '20px',
        boxSizing: 'border-box'
      }}
      justifyContent="center"
      alignItems="center"
    >
        {/* Animated background elements */}
  <div style={{
    position: 'absolute',
    top: '-50px',
    right: '-50px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.05)'
  }}></div>

<div style={{
    position: 'absolute',
    bottom: '-100px',
    left: '-100px',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.03)'
  }}></div>

      <div className="admin-dashboard">
      <Card className="sitecardadmin" style={{
      position: 'relative',
      overflow: 'hidden',
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <ParticlesBg
        type="cobweb"
        bg={true}
        color="#103e82"
        num={50}
      />
          <h2 className="center">
            <b>ADMIN DASHBOARD</b>
          </h2>

          <div className="button-group-admin">
            <button className="styledbutton" onClick={addStudentNavigation}>
              <i className="fa fa-user-plus"></i> Add Student
            </button>

            <button className="styledbutton" onClick={addFacultyNavigation}>
              <i className="fa fa-user-tie"></i> Add Faculty
            </button>

            <button className="styledbutton" onClick={addSubjectNavigation}>
              <i className="fa fa-book-open"></i> Add Subject
            </button>

            <button className="styledbutton" onClick={viewFacultyNavigation}>
              <i className="fa fa-users"></i> View Faculties
            </button>

            <button className="styledbutton" onClick={viewStudentNavigation}>
              <i className="fa fa-user-graduate"></i> View Students
            </button>

            <button className="styledbutton logout-btn" onClick={() => navigate(-1)}>
              <i className="fa fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </Card>
      </div>
    </Grid>

    );


}

export default AdminDashboardPage
