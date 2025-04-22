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
      <div className="studentdashboardpage" style={{
        background: 'linear-gradient(135deg, #103e82 0%, #0c2e66 100%)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
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

        <Card className="sitecard" style={{
          width: '100%',
          maxWidth: '600px',
          padding: '40px',
          borderRadius: '15px',
          background: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative corner elements */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100px',
            height: '100px',
            background: 'linear-gradient(45deg, #103e82, #0c2e66)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
            opacity: 0.8
          }}></div>

          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100px',
            height: '100px',
            background: 'linear-gradient(45deg, #103e82, #0c2e66)',
            clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
            opacity: 0.8
          }}></div>

          {/* Student Dashboard Info */}
          <div style={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 1
          }}>
            <h2 style={{
              color: '#103e82',
              fontSize: '28px',
              fontWeight: '700',
              marginBottom: '30px',
              position: 'relative'
            }}>
              Student Dashboard
              <div style={{
                position: 'absolute',
                bottom: '-10px',
                left: '25%',
                width: '50%',
                height: '4px',
                background: 'linear-gradient(90deg, #103e82, #0c2e66)',
                borderRadius: '2px'
              }}></div>
            </h2>

            <div style={{
              background: 'rgba(16, 62, 130, 0.05)',
              borderRadius: '10px',
              padding: '20px',
              marginBottom: '25px',
              textAlign: 'left'
            }}>
              <p style={{ marginBottom: '15px' }}>
                <span style={{ fontWeight: '600', color: '#103e82', display: 'inline-block', width: '150px' }}>Name:</span>
                <span>{student['Name']}</span>
              </p>
              <p style={{ marginBottom: '15px' }}>
                <span style={{ fontWeight: '600', color: '#103e82', display: 'inline-block', width: '150px' }}>Email:</span>
                <span>{student['EmailID']}</span>
              </p>
              <p style={{ marginBottom: '15px' }}>
                <span style={{ fontWeight: '600', color: '#103e82', display: 'inline-block', width: '150px' }}>Department:</span>
                <span>{student['Department']}</span>
              </p>
              <p style={{ marginBottom: '15px' }}>
                <span style={{ fontWeight: '600', color: '#103e82', display: 'inline-block', width: '150px' }}>Courses Status:</span>
                <span>
                  {Array.isArray(student['Courses_Registered']) && student['Courses_Registered'].length ? (
                    <span style={{ color: '#2ecc71' }}>Registered ✅</span>
                  ) : (
                    <span style={{ color: '#e74c3c' }}>Not Registered ❌</span>
                  )}
                </span>
              </p>
            </div>

            {/* Main Action Button */}
            <div style={{ margin: '30px 0' }}>
              {Array.isArray(student['Courses_Registered']) && student['Courses_Registered'].length ? (
                <button
                  onClick={CESResponsePageNavigation}
                  style={{
                    background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
                    color: 'white',
                    padding: '12px 30px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    width: '100%',
                    maxWidth: '300px'
                  }}
                >
                  Access Course Evaluation
                </button>
              ) : (
                <button
                  onClick={CourseRegPageNavigation}
                  style={{
                    background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                    color: 'white',
                    padding: '12px 30px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    width: '100%',
                    maxWidth: '300px'
                  }}
                >
                  Register for Courses
                </button>
              )}
            </div>

            {/* Secondary Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              marginTop: '30px'
            }}>
              <button
                onClick={SubjectListPageNavigation}
                style={{
                  background: 'linear-gradient(135deg, #103e82 0%, #0c2e66 100%)',
                  color: 'white',
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                View Subject-wise CES
              </button>
              <button
                onClick={() => navigate(-1)}
                style={{
                  background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                  color: 'white',
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </Card>
      </div>

    )
}

export default StudentDashboard
