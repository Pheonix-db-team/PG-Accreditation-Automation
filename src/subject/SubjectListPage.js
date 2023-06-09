import React from 'react'
import { getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigate, useLocation } from "react-router-dom";
function SubjectListPage() {
    const navigate = useNavigate();
    let { state } = useLocation();
    const subjectlistArr = state.subject_arr;
    //const subjectlistArr = [...subject_test_array];
    const handleTap = async (subject_tapped) => {

        try {
            const subjectsRef = collection(db, "survey");
            const query_x = query(subjectsRef, where("SubjectID", "==", subject_tapped.SubjectID));
            const querySnapshot = await getDocs(query_x);

            const surveyList = []
            querySnapshot.forEach((doc) => {
                surveyList.push(doc.data());
            });
            console.log(surveyList);
            navigate('/surveylist', { state: { subject: subject_tapped, survey_arr: surveyList } });
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("⚠" + error.message);
        }
    }
    return (
        <div><h2 className='center'><b>SubjectList Page</b></h2>
            <br></br>
            <table>
                <tr> <th>SubjectID </th> <th>Subject Name</th> <th>Faculty_Assigned</th><th>view surveys</th> </tr>
                {
                    subjectlistArr.map((subject) => <tr key={subject.id}>
                        <td>{subject.SubjectID}</td><td>{subject.Name}</td><td>{subject.Faculty_Assigned}</td> <td> <button className='styledbutton' onClick={() => handleTap(subject)}>View Surveys</button></td>
                    </tr>)
                }
            </table>
            <div className='center'>
                <button className="styledbutton" onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    )
}

export default SubjectListPage
