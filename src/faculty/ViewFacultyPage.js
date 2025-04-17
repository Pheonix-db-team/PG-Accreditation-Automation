import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import AuthIssueComponent from '../components/AuthIssueComponent';
import { faculties_arr_test } from '../App';


function FacultyListPage() {
    const navigate = useNavigate();
    let { state } = useLocation();
    // const subjectlistArr = state.subject_arr;
    //   const facultylistArr = [...faculties_arr_test];
    var facultylistArr = []
    if (state && state.faculty_arr) {
        facultylistArr = [...state.faculty_arr];
    }
    else {
        facultylistArr = [...faculties_arr_test];
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
<div className="facultylist-page">
  <h2 className="facultylist-heading"><b>Faculty List</b></h2>

  <div className="facultylist-table-container">
    <table className="facultylist-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email ID</th>
          <th>Faculty ID</th>
          <th>Department</th>
        </tr>
      </thead>
      <tbody>
        {facultylistArr.map((faculty) => (
          <tr key={faculty.EmailID}>
            <td>{faculty.Name}</td>
            <td>{faculty.EmailID}</td>
            <td>{faculty.FacultyID}</td>
            <td>{faculty.Department}</td>
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

export default FacultyListPage
