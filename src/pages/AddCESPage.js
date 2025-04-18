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
      <div className="ces-form-page" style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #1a2930 100%)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}>
        <Card className="sitecard" style={{
          width: '100%',
          maxWidth: '750px',
          padding: '30px',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Modern header with icon */}
          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'linear-gradient(90deg, #3498db, #2ecc71)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              fontSize: '28px',
              fontWeight: 'bold'
            }}>
              <i className="fas fa-poll" style={{ fontSize: '32px' }}></i>
              <h2 style={{ margin: 0 }}>Create CES Form</h2>
            </div>
            <div style={{
              height: '3px',
              width: '80px',
              background: 'linear-gradient(90deg, #3498db, #2ecc71)',
              margin: '10px auto',
              borderRadius: '3px'
            }}></div>
          </div>

          {/* Two-column layout for form */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
            {/* Left column - Form inputs */}
            <form onSubmit={handleAddQuestion} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: '#2c3e50', fontWeight: '600', fontSize: '15px' }}>Select Subject:</label>
                <select
                  onChange={handleSubjectChange}
                  style={{
                    padding: '12px 15px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    background: 'white',
                    fontSize: '15px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  {subjectArr.map((sub) => (
                    <option key={sub.SubjectID} value={sub.SubjectID}>
                      {sub.Name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: '#2c3e50', fontWeight: '600', fontSize: '15px' }}>Question Prompt:</label>
                <input
                  type="text"
                  value={questionPrompt}
                  onChange={(e) => setQuestionPrompt(e.target.value)}
                  placeholder="Enter your question here"
                  style={{
                    padding: '12px 15px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '15px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                />
              </div>

              {['A', 'B', 'C', 'D'].map((option) => (
                <div key={option} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ color: '#2c3e50', fontWeight: '600', fontSize: '15px' }}>Option {option}:</label>
                  <input
                    type="text"
                    value={eval(`option${option}`)}
                    onChange={(e) => eval(`setOption${option}(e.target.value)`)}
                    style={{
                      padding: '12px 15px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      fontSize: '15px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                  />
                </div>
              ))}

              <button
                type="submit"
                style={{
                  background: 'linear-gradient(90deg, #3498db, #2ecc71)',
                  color: 'white',
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  marginTop: '10px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                Add Question
              </button>
            </form>

            {/* Right column - Date picker and questions list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: '#2c3e50', fontWeight: '600', fontSize: '15px' }}>CES Closing Date:</label>
                <DatePicker
                  selected={lastDate}
                  onChange={(date) => setLastDate(date)}
                  className="custom-datepicker"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <h3 style={{ color: '#2c3e50', marginBottom: '15px', borderBottom: '2px solid #eee', paddingBottom: '8px' }}>Questions Added:</h3>
                <div style={{
                  maxHeight: '300px',
                  overflowY: 'auto',
                  paddingRight: '10px'
                }}>
                  {quesArr.length > 0 ? (
                    quesArr.map((ques) => (
                      <div key={ques['tag']} style={{
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        padding: '15px',
                        marginBottom: '15px',
                        borderLeft: '4px solid #3498db',
                        position: 'relative'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '8px'
                        }}>
                          <b style={{ color: '#2c3e50' }}>{ques.question_prompt}</b>
                          <button
                            onClick={() => handleDelete(ques)}
                            style={{
                              background: '#e74c3c',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '4px 8px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                        {['A', 'B', 'C', 'D'].map((opt) => (
                          <div key={opt} style={{
                            color: '#7f8c8d',
                            fontSize: '14px',
                            marginLeft: '10px'
                          }}>
                            {opt}. {ques[`option_${opt}`]}
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div style={{
                      textAlign: 'center',
                      color: '#95a5a6',
                      padding: '20px',
                      border: '2px dashed #ddd',
                      borderRadius: '8px'
                    }}>
                      <i className="fas fa-inbox" style={{ fontSize: '24px', marginBottom: '10px' }}></i>
                      <div>No questions added yet</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form action buttons */}
          <div style={{
  display: 'flex',
  gap: '20px',
  marginTop: '30px',
  justifyContent: 'flex-start' // This moves them to the left
}}>
  <button
    onClick={handleSubmit}
    className="styledbutton" // Keep your existing button class
    style={{
      background: 'linear-gradient(90deg, #2ecc71, #27ae60)',
      padding: '12px 30px'
    }}
  >
    Submit CES
  </button>
  <button
    onClick={goBack}
    className="styledbutton" // Keep your existing button class
    style={{
      background: 'linear-gradient(90deg, #95a5a6, #7f8c8d)',
      padding: '12px 30px'
    }}
  >
    Back
  </button>
</div>
        </Card>
      </div>
    )
} export default AddCESPage
