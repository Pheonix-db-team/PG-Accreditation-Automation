import React from 'react'
import { useState, useEffect } from 'react';
import { doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLocation } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import AuthIssueComponent from '../components/AuthIssueComponent';
import Card from 'react-bootstrap/Card';
import img1 from '../image/NiTC1.png';
function AddCESPage() {
    const navigate = useNavigate();
    let { state } = useLocation();
    var fac_details = {};
    var faculty_mail_from_prop = "";

    if (state) {
        fac_details = state.fac;
        faculty_mail_from_prop = fac_details.EmailID;
    }
    //const navigate = useNavigate();
    const [questionPrompt, setQuestionPrompt] = useState("");
    const [lastDate, setLastDate] = useState(new Date());
    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionC, setOptionC] = useState("");
    const [optionD, setOptionD] = useState("");
    const [subject, setSubject] = useState("No Subject Available")
    const [quesArr, setQuesArr] = useState([])
    const [subjectArr, setSubjectArr] = useState([])
    useEffect(() => {
        const fetch_and_update_subject = async () => {
            try {
                const subjectsRef = collection(db, "subject");
                const query_x = query(subjectsRef, where("Faculty_Assigned", "==", faculty_mail_from_prop), where("CourseExitSurveyAvailable", "==", false));
                //const querySnapshot = await getDocs(collection(db, "subject"));
                const querySnapshot = await getDocs(query_x);
                const fetched_sub_wo_CES = []
                querySnapshot.forEach((doc) => {
                    fetched_sub_wo_CES.push(doc.data());
                });
                if (fetched_sub_wo_CES)
                    setSubjectArr(fetched_sub_wo_CES);
                console.log(fetched_sub_wo_CES);
                if (fetched_sub_wo_CES.length > 0) {
                    console.log("subID to set in dropdown " + fetched_sub_wo_CES[0].SubjectID);
                    setSubject(fetched_sub_wo_CES[0].SubjectID);
                }
            }
            catch (error) {
                console.error(error);
                console.log(error.code)
                alert("⚠" + error.message);
            }
        }; fetch_and_update_subject();
    }
        , []);
    const goBack = () => {
        navigate(-1);
    }
    function getSemID() {
        const date_today = new Date();
        const year_now = date_today.getFullYear();
        const month_now = date_today.getMonth();
        const sem_char = (month_now <= 5) ? 'Monsoon' : 'Winter';
        const curr_sem_id = sem_char + year_now; return curr_sem_id
    }
    const handleSubjectChange = (e) => {
        setSubject(e.target.value)
    }
    const handleDelete = (deleting_ques) => {
        console.log("Delete function called on " + deleting_ques.question_prompt)
        const ques_arr_temp_del = quesArr.filter((ques) => ques.tag !== deleting_ques.tag);
        setQuesArr(ques_arr_temp_del)
    }
    const handleAddQuestion = async (event) => {
        event.preventDefault();
        console.log("Before")
        console.log(quesArr);
        const temp_index = quesArr.length;
        console.log("curr ques index " + temp_index)
        let temp_ques_arr = [];
        if (quesArr.length) {
            temp_ques_arr = [...quesArr];
        }
        const dict_temp = {
            tag: temp_index,
            question_prompt: questionPrompt,
            option_A: optionA,
            option_B: optionB,
            option_C: optionC,
            option_D: optionD,
        }
        temp_ques_arr.push(
            dict_temp
        );
        console.log("curr " + dict_temp)
        setQuesArr(temp_ques_arr);
        console.log(quesArr);
        setQuestionPrompt("")
        setOptionA("")
        setOptionB("")
        setOptionC("")
        setOptionD("")
    }
    const handleSubmit = async (event) => {
        try {
            if (quesArr.length == 0) {
                alert("Empty ques Arr")
                return;
            }
            const sem_id = getSemID();
            console.log("sem ID " + sem_id);
            const survey_id = subject + "_" + sem_id;
            console.log("survey ID " + survey_id);
            const docRef = await setDoc(doc(db, "survey", survey_id), {
                Question_List: quesArr, facultyEmail: faculty_mail_from_prop,
                Survey_ID: survey_id, Sem_ID: sem_id, SubjectID: subject,
                faculty_name: fac_details['Name']
            });
            var temp_ls_date = lastDate
            temp_ls_date.setHours(23, 59, 59)
            console.log(temp_ls_date)
            const docRef1 = await setDoc(doc(db, "subject", subject), {
                "Question_List": quesArr, "CourseExitSurveyAvailable": true,
                "last_date": temp_ls_date, Survey_ID: survey_id,
            }, { merge: true }); console.log(docRef);
            console.log("Added " + survey_id);
            alert("Added " + survey_id)
            navigate(-1);
        } catch (error) {
            console.log(error.code)
            alert("CES Submission Issue" + error.message);
        }
        alert("CES Submission Added");
        setQuesArr([])
    }
    if (!state) {
        return AuthIssueComponent();
    }
    if (subjectArr && subjectArr.length <= 0) {
        return (<body><button className="styledbutton" onClick={goBack}>Back</button>	No course available for ces</body>)
    }
    return (
        <div className="ces-form-page">
        <Card className="sitecard">
          <div className="contentalign">

            <h2><b>Add CES Form</b></h2>
          </div>

          <form onSubmit={handleAddQuestion}>
            <div className="form-section">
              <label><b>Select Subject:</b></label>
              <select onChange={handleSubjectChange}>
                {subjectArr.map((sub) => (
                  <option key={sub.SubjectID} value={sub.SubjectID}>
                    {sub.Name}
                  </option>
                ))}
              </select>

              <label><b>Question Prompt:</b></label>
              <input
                type="text"
                value={questionPrompt}
                onChange={(e) => setQuestionPrompt(e.target.value)}
                placeholder="Enter your question here"
              />

              <label><b>Option A:</b></label>
              <input
                type="text"
                value={optionA}
                onChange={(e) => setOptionA(e.target.value)}
              />

              <label><b>Option B:</b></label>
              <input
                type="text"
                value={optionB}
                onChange={(e) => setOptionB(e.target.value)}
              />

              <label><b>Option C:</b></label>
              <input
                type="text"
                value={optionC}
                onChange={(e) => setOptionC(e.target.value)}
              />

              <label><b>Option D:</b></label>
              <input
                type="text"
                value={optionD}
                onChange={(e) => setOptionD(e.target.value)}
              />

              <input type="submit" value="Add Question" className="styledbutton" />
            </div>
          </form>

          <div className="form-section">
            <label><b>CES Closing Date:</b></label>
            <DatePicker selected={lastDate} onChange={(date) => setLastDate(date)} />
          </div>

          <div className="button-group">
            <button className="styledbutton" onClick={handleSubmit}>Submit CES</button>
            <button className="styledbutton" onClick={goBack}>Back</button>
          </div>

          <div className="form-section">
            <h3>Questions Added:</h3>
            {quesArr.map((ques) => (
              <div className="question-box" key={ques['tag']}>
                <b>{ques.question_prompt}</b>
                <div>A. {ques.option_A}</div>
                <div>B. {ques.option_B}</div>
                <div>C. {ques.option_C}</div>
                <div>D. {ques.option_D}</div>
                <button className="deletebutton" onClick={() => handleDelete(ques)}>Delete</button>
              </div>
            ))}
          </div>
        </Card>
      </div>

    )
} export default AddCESPage
