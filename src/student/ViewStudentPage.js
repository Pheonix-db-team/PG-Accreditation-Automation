import React from 'react'
import { getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigate, useLocation } from "react-router-dom";
import AuthIssueComponent from '../components/AuthIssueComponent';
import { faculties_arr_test } from '../App';
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
        <div>
             <h2 className='center'><b>Student List</b></h2>
            
            <table className='facultytable'>

                <tr> <th>Name </th> <th>EmailID</th> <th>Enrolment number</th><th>Department</th> </tr>
                {
                    studentlistArr.map((student) => <tr key={student.Name}>
                        <td>{student.Name}</td> <td>{student.EmailID}</td><td>{student.Enrolment_No}</td><td>{student.Department}</td></tr>)
                }
            </table>
            <div className='center'>
            <button className="styledbutton" onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    )
}

export default StudentListPage
