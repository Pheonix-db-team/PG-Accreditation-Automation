import React from 'react';
import { useState, useEffect } from 'react';
import { getDocs, collection, setDoc, getDoc, doc, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigate, useLocation } from "react-router-dom";
import AuthIssueComponent from '../components/AuthIssueComponent';
import Card from 'react-bootstrap/Card';
import img1 from '../image/NiTC1.png';
function StudentDashboard() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [student, setStudent] = useState(state.student);
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
            //console.log("Fetched data");
            //console.log(filtered_data);
            setStudent(filtered_data);
        }
        catch (err) {
            console.error(err);
            alert("⚠" + err.message);
        }
    };
    // useEffect((event) => {
    //     if (state) {
    //         console.log("culprit")
    //         setStudent(state.student);
    //     }
    // }
    //     , []);
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
    // useEffect(() => {
    //     const fetchDetails = async () => {
    //         try {
    //             const data = await getDoc(doc(db, "Student", state.student.EmailID));
    //             const filtered_data = data.data();
    //             console.log("Fetched data");
    //             console.log(filtered_data);
    //             setStudent(filtered_data);
    //         }
    //         catch (err) {
    //             console.error(err);
    //             alert("⚠" + err.message);
    //         }

    //     };
    //     console.log("use Effect called");
    //     if (state) {
    //         setStudent(state.student);
    //         fetchDetails();
    //     }
    // }
    //     , []);
    console.log(student);
    if (!(state)) {
        return (AuthIssueComponent());
    }
    return (
        <div className="studentdashboardpage">
              <div className="card-container"></div>

        <Card className="sitecard" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <img className="showlogo" src={img1} alt="Logo" style={{ width: '85%' }} />
        </div>

        {/* Student Dashboard Info */}
        <div className="stdDash" style={{ textAlign: 'center' }}>
          <h2 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Student Dashboard</h2>

          <p><b>Name</b>: {student['Name']}</p>
          <p><b>Email</b>: {student['EmailID']}</p>
          <p><b>Department</b>: {student['Department']}</p>
          <p><b>Courses Registered Status</b>:
            {(Array.isArray(student['Courses_Registered']) && student['Courses_Registered'].length) ? " ✅" : " ❌"}
          </p>

          {/* CES Availability Button */}
          <div style={{ margin: '20px 0' }}>
            {(Array.isArray(student['Courses_Registered']) && student['Courses_Registered'].length) ? (
              <button className="styledbutton" onClick={CESResponsePageNavigation}>
                CES Available
              </button>
            ) : (
              <button className="styledbutton" onClick={CourseRegPageNavigation}>
                Register for Courses
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <button className="styledbutton" onClick={SubjectListPageNavigation}>
              CES Subjectwise
            </button>
            <button className="styledbutton" onClick={() => navigate(-1)}>
              Logout
            </button>
          </div>
        </div>
      </Card>
      </div>


    )
}

export default StudentDashboard
