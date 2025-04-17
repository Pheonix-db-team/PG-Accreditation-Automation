import React from 'react'
import { getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigate, useLocation } from "react-router-dom";
import AuthIssueComponent from '../components/AuthIssueComponent';
import { faculties_arr_test } from '../App';
import Card from 'react-bootstrap/Card';

function StudentListPage() {
    const navigate = useNavigate();
    let { state } = useLocation();
    // const subjectlistArr = state.subject_arr;
    //   const facultylistArr = [...faculties_arr_test];
    var studentlistArr = []
    if (state && state.student_arr) {
        studentlistArr = [...state.student_arr];
    }
    else {
        studentlistArr = [...faculties_arr_test];
    }
    // const handleTap = async (subject_tapped) => {
    //     //Modify acc to delete, delete not required as of now
    //     try {
    //         const subjectsRef = collection(db, "survey");
    //         const query_x = query(subjectsRef, where("SubjectID", "==", subject_tapped.SubjectID));
    //         const querySnapshot = await getDocs(query_x);

    //         const surveyList = []
    //         querySnapshot.forEach((doc) => {
    //             surveyList.push(doc.data());
    //         });
    //         console.log(surveyList);
    //         navigate('/surveylist', { state: { subject: subject_tapped, survey_arr: surveyList } });
    //     } catch (error) {
    //         console.error("Error adding document: ", error);
    //         alert("⚠" + error.message);
    //     }
    // }
    if (!(state && state.admin)) {
        return AuthIssueComponent();
    }
    return (
        <div className="view-student-list-page">
        <h2 className="list-heading"><b>Student List</b></h2>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email ID</th>
                <th>Enrolment Number</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {studentlistArr.map((student) => (
                <tr key={student.Enrolment_No}>
                  <td>{student.Name}</td>
                  <td>{student.EmailID}</td>
                  <td>{student.Enrolment_No}</td>
                  <td>{student.Department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="center">
          <button className="styledbutton" onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>


    )
}

export default StudentListPage
