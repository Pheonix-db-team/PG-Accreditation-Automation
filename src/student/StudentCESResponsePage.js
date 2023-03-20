import React from 'react'
import { useState, useEffect } from 'react';
import { doc, setDoc, getDocs, collection, arrayRemove, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getValueByKey } from '../App';
import "react-datepicker/dist/react-datepicker.css";
import AuthIssueComponent from '../components/AuthIssueComponent';
function StudentCESResponsePage() {
    const navigate = useNavigate();
    let { state } = useLocation();
    var stu_email = "";
    if (state) {
        stu_email = state.student['EmailID'];
    }
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
    const local_update_subject = async (subject_id) => {
        const temp_sub_arr = [];
        subjectArr.map((ele) => {
            if (ele['SubjectID'] != subject_id) {
                temp_sub_arr.push(ele);
            }
        });
        if (temp_sub_arr.length) {
            setSubjectArr(temp_sub_arr);
            setSubject(temp_sub_arr[0]['SubjectID']);
            setSubjectMap(temp_sub_arr[0]);
        } else {
            setSubjectArr([]);
            setSubject("");
            setSubjectMap({});
        }
    }
    const fetch_and_update_subject = async (subject_id) => {
        try {
            if (state) {
                const subjectsRef = collection(db, "subject");
                const CES_Remaining_arr = [...state.student['CES_Remaining']];
                const fetched_sub_w_CES = []
                const today = new Date().setHours(0, 0, 0);
                console.log(state.student['Courses_Registered'])
                const query_x = query(subjectsRef, where("CourseExitSurveyAvailable", "==", true), where("SubjectID", "in", ['DS', 'CS101']),
                    where("last_date", ">=", today),);
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
                            if (today <= date_here) {
                                console.log(data_here['SubjectID'] + " with seconds " + date_here);
                                fetched_sub_w_CES.push(data_here);
                            }
                        }
                    };
                });
                setSubjectArr(fetched_sub_w_CES);
                console.log("fetched sub");
                console.log(fetched_sub_w_CES);
                if (fetched_sub_w_CES && fetched_sub_w_CES.length) {
                    setSubjectMap(fetched_sub_w_CES[0]);
                    setSubject(fetched_sub_w_CES[0]['SubjectID']);
                    setQuesArr(fetched_sub_w_CES[0]['Question_List']);
                    console.log("Ques arr " + quesArr);
                    fetched_sub_w_CES[0]['Question_List'].map((ques, key) => {
                        option_selected_dict[ques['tag']] = 'A';
                    })
                }
                else {
                    setSubject(null);
                    setQuesArr([]);
                }
            }
        }
        catch (error) {
            console.error(error);
            console.log(error.code)
            alert("Data Fetch Issue⚠" + error.message);
        }
    };
    useEffect(() => {
        if (state) {
            console.log("Welcome to CES Response Page " + state.student['EmailID'])
        }
        fetch_and_update_subject();
    }
        , []);

    const goBack = () => {
        navigate(-1);
    }
    const handleSubjectChange = (e) => {
        const sub_id = e.target.value;
        setSubject(sub_id);
        const sub_index_from_arr = getValueByKey(subjectArr, 'SubjectID', sub_id);
        setSubjectMap(subjectArr[sub_index_from_arr]);
        setQuesArr(subjectArr[sub_index_from_arr]['Question_List']);
    }

    const handleSubmit = async (event) => {
        try {
            const survey_id = subjectMap['Survey_ID'];
            const subject_id = subject;
            const survey_response_unique_id = survey_id + stu_email;
            console.log("suv unique id " + survey_response_unique_id);
            const docRef = await setDoc(doc(db, "CESResponses", survey_response_unique_id), {
                Responses: optionsDict,
                Survey_ID: survey_id, StudentEmail: stu_email, SubjectID: subject_id,
                Enrolment_No: state.student['Enrolment_No'],
            });
            const docRef1 = await setDoc(doc(db, "Student", stu_email), {
                CES_Remaining: arrayRemove(subject_id)
            }, { merge: true }); console.log(docRef);
            console.log("Added " + survey_id + " with " + survey_response_unique_id);
            //fetch_and_update_subject(subject_id);
            local_update_subject(subject_id);
        } catch (error) {
            console.log(error.code)
            alert("Issue⚠" + error.message);
        }
    }
    function ButtonShow(component) {
        if (quesArr && quesArr.length) {
            return component;
        }
        return <br></br>;
    }
    if (!(state)) {
        return (AuthIssueComponent());
    }
    if (subjectArr && subjectArr.length <= 0) {
        return (<body><button className="styledbutton" onClick={goBack}>Back</button>	<br></br>No CES survey available for you</body>)
    }
    return (
        <body>
            <br></br>

            {"⬇️ Select Subject ⬇️"}
            <br></br>
            <div key="Subject">
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
            {(quesArr.length) ? <button className='styledbutton' onClick={() => handleSubmit()}>Submit CES Response</button> : <div>No questions</div>}
        </body>
    )
} export default StudentCESResponsePage