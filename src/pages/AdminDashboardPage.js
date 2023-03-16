import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import AuthIssueComponent from '../components/AuthIssueComponent';
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
    function addSubjectNavigation() {
        console.log("add subject tapped Calling navigation ")
        navigate('/addsubject', { state: { admin: state.admin } });

    }
    if (!(state && state.admin)) {
        return AuthIssueComponent();
    }
    return (
        <body>
            <button className='styledbutton' onClick={() => navigate(-1)}>Logout</button>
            <br></br>
            <button className='styledbutton' onClick={() => addStudentNavigation()}>Add student</button>
            <br></br>
            <button className='styledbutton' onClick={() => addFacultyNavigation()}>Add Faculty</button>
            <br></br>
            <button className='styledbutton' onClick={() => addSubjectNavigation()}>Add Subject</button>

        </body>
    );


}

export default AdminDashboardPage