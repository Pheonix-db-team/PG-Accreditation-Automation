import React from 'react';
import AuthIssueComponent from '../components/AuthIssueComponent';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { getDocs, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getValueByKey } from '../App';
import Card from 'react-bootstrap/Card';
import '../App.css';
//import { student_test } from "../App.js";
function StudentCourseRegPage(navigation) {
    const { state } = useLocation();
    const navigate = useNavigate();
    var student_data = {};
    var subject_array = [];
    if (state) {
        student_data = state.student;
        subject_array = [...state.subject_arr];
    }
    function subject_from_id(subject_dict, subject_id) {
        console.log(subject_dict);
        var index = getValueByKey(subject_dict, "SubjectID", subject_id,);
        console.log("Index " + index + " " + subject_dict[index])
        return subject_dict[index]['Name'];
    }
    const [checkedState, setCheckedState] = useState(
        new Array(subject_array.length).fill(false)
        // fill array size w false
    );
    const [ssubjects, setSsubjects] = useState([]);
    const handleRegisterSubmit = async (event) => {
        //prevent redirect to oth. page
        event.preventDefault();
        try {
            const docRef = await setDoc(doc(db, "Student", student_data.EmailID), {
                Courses_Registered: ssubjects,
                CES_Remaining: ssubjects,

            }, { merge: true });

            console.log("DocRef ", docRef);
            setCheckedState(new Array(subject_array.length).fill(false));
            setSsubjects([]);

            navigate(-1);
            //window.location.reload(true);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    //const getFormattedSubjectID = (SubjectID) => SubjectID;

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item);
        setCheckedState(updatedCheckedState);
        // sub_temp_arr=[]
        const ssubjectsSubjectID = updatedCheckedState.reduce((sum, currentState, index) => { if (currentState === true) { return sum + subject_array[index].SubjectID; } return sum; }, 0);
        let i = 0;
        const ssubjectsSubjectID_arr = [];
        while (i < updatedCheckedState.length) {

            if (updatedCheckedState[i]) {
                //   console.log(i + " th index has value :" + updatedCheckedState[i]);
                ssubjectsSubjectID_arr.push(subject_array[i].SubjectID);
            }
            i++;
        }
        console.log(ssubjectsSubjectID_arr);
        setSsubjects(ssubjectsSubjectID_arr);
    };
    if (!(state)) {

        return (AuthIssueComponent());
    }
    if (student_data.Courses_Registered.length == 0)
        return (
            <Card className='studentcard'>

            <body>
              <div><h2><b>Student Course RegPage</b></h2>
                    
                    <ul >
                        {subject_array.map(({ SubjectName, SubjectID }, index) => {
                            console.log(SubjectID);
                            return (
                                <li key={index}>
                                    <div key={SubjectName}>

                                        <input
                                            type="checkbox"
                                            id={`custom-checkbox-${index}`}
                                            name={SubjectID}
                                            value={SubjectName}
                                            checked={checkedState[index]}
                                            onChange={() => handleOnChange(index)}
                                        /><label >{subject_from_id(subject_array, SubjectID)}</label>

                                    </div>
                                </li>

                            );
                        })}
                        <button className='styledbutton' onClick={handleRegisterSubmit} >Register</button>
                        <button className='styledbutton' onClick={() => navigate(-1)}>Back</button>
                       <br></br>
                       <br></br>
                        <div >Subjects selected :</div>
                        <div>{ssubjects.map((subject) => <li> <div key={subject}>
                            <h6> {subject_from_id(subject_array, subject)}</h6>
                        </div></li>)}
                        </div>

                    </ul>
                </div>
            </body>
            </Card>
        );
    else {
        return (<div>Registered </div>)
    }
}
//import { getValueByKey } from '../App';

export default StudentCourseRegPage