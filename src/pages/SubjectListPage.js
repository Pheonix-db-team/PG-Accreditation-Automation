import React from 'react'
import { useEffect, useState } from 'react'
import { deleteDoc, getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';
import { useNavigate, useLocation } from "react-router-dom";
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
        }
    }


    return (
        <div>SubjectList Page
            <br></br>
            <button className="styledbutton" onClick={() => navigate(-1)}>Back</button>
            <br></br>
            <br></br>
            <div>
                {
                    subjectlistArr.map((subject) => <div key={subject.id}>
                        <h6>{subject.SubjectID} | {subject.Name} | {subject.Faculty_Assigned} <button className='styledbutton' onClick={() => handleTap(subject)}>View Surveys</button></h6>
                    </div>)
                }
            </div>
        </div>
    )
}

export default SubjectListPage
