import React from 'react'
import { useEffect, useState } from 'react'
import { deleteDoc, getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';
//import { useNavigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
function SurveyListPage() {
    const navigate = useNavigate();
    let { state } = useLocation();
    // console.log(state?.user_email);
    // const [studentList, setStudentList] = useState([])


    const surveyListArr = state.survey_arr ? [...state.survey_arr] : [];
    console.log("Arr load ")
    console.log(surveyListArr)
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
            console.error("Error adding document: ", error);
        }
    }



    return (

        (surveyListArr && surveyListArr.length == 0) ? < div > No CES available for  {state.subject}</div > : <div>SurveyListArr
            <br></br>

            <div>
                <br></br>
                {state.subject} Surveys
                <br></br>
                {
                    surveyListArr.map((survey) => <div key={survey.Sem_ID}>
                        <h6>Semester:  {survey.Sem_ID} | {survey.Faculty_Email} <button className='styledbutton' onClick={() => handleTap(survey)}>View Surveys</button></h6>
                    </div>)
                }
            </div>
        </div>
    );
}

export default SurveyListPage
