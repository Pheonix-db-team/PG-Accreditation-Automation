import React from 'react'
import { useEffect, useState } from 'react'
import { deleteDoc, getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';
import { useNavigate, useLocation } from "react-router-dom";
import AuthIssueComponent from '../components/AuthIssueComponent';
import { subject_test_array } from '../App';
// async function refreshList() {
//     try {
//         const studentsCollectionRef = collection(db, "test_pilot");
//         const data = await getDocs(studentsCollectionRef);

//         const filtered_data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//         console.log(filtered_data);
//         return filtered_data
//         //setStudentList(filtered_data);
//     }
//     catch (err) {
//         console.error(err);
//     }

// };


function SubjectListPage() {
    const navigate = useNavigate();
    //const navigate = useNavigate();
    let { state } = useLocation();
    // console.log(state?.user_email);
    const [studentList, setStudentList] = useState([])
    const subjectlistArr = state.subject_arr;
    //const subjectlistArr = [...subject_test_array];
    const handleTap = async (subject_tapped) => {

        try {
            //await deleteDoc(doc(db, "test_pilot", deleting_student.id));
            const subjectsRef = collection(db, "survey");
            const query_x = query(subjectsRef, where("SubjectID", "==", subject_tapped.SubjectID));
            const querySnapshot = await getDocs(query_x);

            const surveyList = []
            querySnapshot.forEach((doc) => {


                surveyList.push(doc.data());
            });
            console.log(surveyList);
            //etStudentList(updated_list);
            navigate('/surveylist', { state: { subject: subject_tapped, survey_arr: surveyList } });
            //alert(subject_tapped+ " Deleted!");
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("⚠" + error.message);
        }
    }


    return (
        <div>SubjectList Page
            <br></br>
            <button className="styledbutton" onClick={() => navigate(-1)}>Back</button>
            <br></br>
            <br></br>

            <table>
                <tr> <th>SubjectID </th> <th>Subject Name</th> <th>Faculty_Assigned</th><th>view surveys</th> </tr>
                {
                    subjectlistArr.map((subject) => <tr key={subject.id}>
                        <td>{subject.SubjectID}</td><td>{subject.Name}</td><td>{subject.Faculty_Assigned}</td> <td> <button className='styledbutton' onClick={() => handleTap(subject)}>View Surveys</button></td>
                    </tr>)
                }
            </table>
        </div>
    )
}

export default SubjectListPage
