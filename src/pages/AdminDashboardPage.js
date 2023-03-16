import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import AuthIssueComponent from '../components/AuthIssueComponent';
import { getDocs, collection, setDoc, getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
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
            <br></br>
            <button className='styledbutton' onClick={() => viewFacultyNavigation()}>View Faculties</button>

        </body>
    );


}

export default AdminDashboardPage