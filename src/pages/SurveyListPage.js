import React from 'react'
import { useEffect, useState } from 'react'
import { deleteDoc, getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';
import { useNavigate, useLocation } from "react-router-dom";
import AuthIssueComponent from '../components/AuthIssueComponent';
function SurveyListPage() {
    const navigate = useNavigate();
    let { state } = useLocation();
    // console.log(state?.user_email);
    // const [studentList, setStudentList] = useState([])


    const surveyListArr = state.survey_arr ? state.survey_arr : [];
    console.log("Arr load ")
    console.log(surveyListArr.length)
    const handleTap = async (survey_tapped) => {

        try {
            //await deleteDoc(doc(db, "test_pilot", deleting_student.id));
            const subjectsRef = collection(db, "CESResponses");
            const query_x = query(subjectsRef, where("Survey_ID", "==", survey_tapped.Survey_ID));
            const querySnapshot = await getDocs(query_x);

            const responsesList = []
            querySnapshot.forEach((doc) => {


                responsesList.push(doc.data());
            });
            console.log(responsesList);
            navigate('/viewcesresponses', { state: { survey: survey_tapped, responsesArr: responsesList } });

            //etStudentList(updated_list);
            //alert(subject_tapped+ " Deleted!");
        } catch (error) {
            alert("⚠" + error.message);
            console.error("Error adding document: ", error);
        }
    }





    if (!surveyListArr.length) { return (< div >  <button className="styledbutton" onClick={() => navigate(-1)}>Back</button> No Surveys Available for  {state.subject.Name}</div >); }
    else {
        return (<div>
            <br></br>

            <div>
                <button className="styledbutton" onClick={() => navigate(-1)}>Back</button>
                <br></br>
                {state.subject['Name']} Surveys
                <br></br>
                <table>
                    <tr> <th>SemesterID </th> <th>Faculty Name</th><th>view responses</th> </tr>
                    {
                        surveyListArr.map((survey) => <tr key={survey.Sem_ID}>
                            <td>{survey.Sem_ID}</td><td>{survey.faculty_name}</td><td> <button className='styledbutton' onClick={() => handleTap(survey)}>View Responses</button></td>
                        </tr>)
                    }
                </table>

            </div>
        </div>);
    }

}

export default SurveyListPage
