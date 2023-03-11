import React from 'react'
import { useState, useEffect } from 'react';
import { doc, setDoc, getDocs, collection, arrayRemove, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getValueByKey } from '../App';
import "react-datepicker/dist/react-datepicker.css";

function StudentCESResponsePage() {
    const navigate = useNavigate();
    let { state } = useLocation();
    const [subject, setSubject] = useState("No Subject Available");
    const [subjectMap, setSubjectMap] = useState({})
    const [quesArr, setQuesArr] = useState([])
    const [subjectArr, setSubjectArr] = useState([]);
    const option_selected_dict = {};
    quesArr.map((ques, key) => {
        option_selected_dict[ques['tag']] = 'A';
    })
    const [optionsDict, setOptionsDict] = useState(option_selected_dict);
    console.log("option dict check " + optionsDict[0])
    const handleMultiRadioChange = (e, tag) => {
        const dict_temp = optionsDict;
        dict_temp[tag] = e.target.value;
        setOptionsDict(dict_temp);
        console.log(tag + " tag changed to " + optionsDict[tag]);
    }
    useEffect(() => {
        const fetch_and_update_subject = async () => {
            try {
                const subjectsRef = collection(db, "subject");

                const CES_Remaining_arr = [...state.student['CES_Remaining']];
                const fetched_sub_w_CES = []
                //  var today = Timestamp.fromDate(new Date());
                const today = new Date().setHours(0, 0, 0);
                console.log(state.student['Courses_Registered'])
                //where("SubjectID", "in", student['Courses_Registered'])
                const query_x = query(subjectsRef, where("CourseExitSurveyAvailable", "==", true), where("SubjectID", "in", ['DS', 'CS101']),
                    where("last_date", ">=", today),);
                //ces av. subjects
                //   const querySnapshot = await getDocs(query_x);
                const querySnapshot = await getDocs(subjectsRef);

                console.log("Responses")
                querySnapshot.forEach((doc) => {
                    const data_here = doc.data();

                    if (CES_Remaining_arr.includes(data_here['SubjectID'])) {
                        const date_here = new Date(0);
                        if (data_here['CourseExitSurveyAvailable'] && data_here['last_date']) {

                            const secs = data_here['last_date']['seconds']
                            date_here.setUTCSeconds(secs);
                            date_here.setHours(0, 0, 0);

                            // console.log(data_here);
                            if (today <= date_here) {
                                console.log("seconds " + date_here);
                                console.log(data_here['SubjectID']);
                                fetched_sub_w_CES.push(data_here);
                            }
                        }
                        //date_here.setUTCSeconds(data_here[last_date])
                        // const ts_obj = new Timestamp(data_here['last_date']);
                        //const data_date = ts_obj.toDate();
                        //console.log("Date " + data_date);

                    };
                });



                setSubjectArr(fetched_sub_w_CES);
                console.log(fetched_sub_w_CES);
                console.log("subID to set in dropdown " + fetched_sub_w_CES[0].SubjectID);
                setSubject(fetched_sub_w_CES[0].SubjectID);
                setQuesArr(fetched_sub_w_CES[0]['Question_List'])

            }
            catch (error) {
                console.error(error);

                console.log(error.code)
                alert("Data Fetch Issue⚠" + error.message);
            }
        };
        console.log("Welcome to CES Response Page " + state.student['EmailID'])
        fetch_and_update_subject();
    }
        , []);
    const goBack = () => {
        navigate(-1);
    }
    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
        const sub_index_from_arr = getValueByKey(subjectArr, 'SubjectID', subject);
        setSubjectMap(subjectArr[sub_index_from_arr]);
        setQuesArr(subjectMap['Question_List']);
    }

    const handleSubmit = async (event) => {
        try {
            const stu_email = state.student['EmailID'];
            const survey_id = state.subject['Survey_ID'];
            const survey_unique_id = survey_id + stu_email;
            const subject_id = state.subject['SubjectID']
            const docRef = await setDoc(doc(db, "CESResponses", survey_unique_id), {
                Responses: quesArr,
                Survey_ID: survey_id, StudentEmail: stu_email, SubjectID: subject_id,
                Enrollment_No: state.student['Enrollment_No'],
            });
            const docRef1 = await setDoc(doc(db, "Student", stu_email), {
                CES_Remaining: arrayRemove(subject_id)
            }, { merge: true }); console.log(docRef);
            console.log("Added " + survey_id);
        } catch (error) {
            console.log(error.code)
            alert("Issue⚠" + error.message);
        }
    }
    if (subjectArr && subjectArr.length <= 0) {
        return (<body><button className="styledButton" onClick={goBack}>Back</button>	No course available for ces</body>)
    }
    return (
        <body>
            <br></br>
            {"⬇️ Select Subject ⬇️"}
            <br></br>
            <div>
                <select onChange={handleSubjectChange}>                        {subjectArr.map((sub) => <option key={sub.SubjectID
                } value={sub.SubjectID}>{sub.Name}</option>)}
                </select>
            </div>
            {quesArr.map((ques, index) =>
                <div key={index}>
                    <br></br>
                    Question tag: {ques['tag']}
                    <br></br>
                    {ques['question_prompt']}<br></br>
                    <label ><input type="radio" name={ques['tag']} value='A' defaultChecked={optionsDict[ques['tag']] === "A"} onChange={(e) => handleMultiRadioChange(e, ques['tag'])} />{ques['option_A']}</label>
                    <label ><input type="radio" name={ques['tag']} value='B' defaultChecked={optionsDict[ques['tag']] === "B"} onChange={(e) => handleMultiRadioChange(e, ques['tag'])} />{ques['option_B']}</label>
                    <label ><input type="radio" name={ques['tag']} value='C' defaultChecked={optionsDict[ques['tag']] === "C"} onChange={(e) => handleMultiRadioChange(e, ques['tag'])} />{ques['option_C']}</label>
                    <label ><input type="radio" name={ques['tag']} value='D' defaultChecked={optionsDict[ques['tag']] === "D"} onChange={(e) => handleMultiRadioChange(e, ques['tag'])} />{ques['option_D']}</label>
                    <br></br>
                </div>
            )
            }
            <button className='styledbutton' onClick={() => handleSubmit()}>Submit CES Response</button>
        </body>
    )
} export default StudentCESResponsePage