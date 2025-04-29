import React from 'react';
import { useState, useEffect } from 'react';
import { doc, setDoc, getDocs, collection, arrayRemove } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import AuthIssueComponent from '../components/AuthIssueComponent';
import Card from 'react-bootstrap/Card';
import img1 from '../image/NiTC1.png';
import './StudentCESResponse.css'; // Create this CSS file

function StudentCESResponsePage() {
    const navigate = useNavigate();
    let { state } = useLocation();
    var stu_email = "";
    if (state) {
        stu_email = state.student['EmailID'];
    }
    const [subject, setSubject] = useState("No Subject Available");
    const [subjectMap, setSubjectMap] = useState({});
    const [quesArr, setQuesArr] = useState([]);
    const [subjectArr, setSubjectArr] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const option_selected_dict = {};
    quesArr.forEach((ques) => {
        option_selected_dict[ques['tag']] = 'A';
    });
    const [optionsDict, setOptionsDict] = useState(option_selected_dict);

    const handleMultiRadioChange = (e, tag) => {
        const dict_temp = { ...optionsDict };
        dict_temp[tag] = e.target.value;
        setOptionsDict(dict_temp);
    };

    const local_update_subject = async (subject_id) => {
        const temp_sub_arr = subjectArr.filter(ele => ele['SubjectID'] !== subject_id);
        if (temp_sub_arr.length) {
            setSubjectArr(temp_sub_arr);
            setSubject(temp_sub_arr[0]['SubjectID']);
            setSubjectMap(temp_sub_arr[0]);
            setQuesArr(temp_sub_arr[0]['Question_List']);
        } else {
            setSubjectArr([]);
            setSubject("");
            setSubjectMap({});
            setQuesArr([]);
        }
    };

    const fetch_and_update_subject = async () => {
        try {
            if (state) {
                const subjectsRef = collection(db, "subject");
                const CES_Remaining_arr = [...state.student['CES_Remaining']];
                const fetched_sub_w_CES = [];
                const today = new Date().setHours(0, 0, 0);

                const querySnapshot = await getDocs(subjectsRef);
                querySnapshot.forEach((doc) => {
                    const data_here = doc.data();
                    if (CES_Remaining_arr.includes(data_here['SubjectID'])) {
                        const date_here = new Date(0);
                        if (data_here['CourseExitSurveyAvailable'] && data_here['last_date']) {
                            const secs = data_here['last_date']['seconds'];
                            date_here.setUTCSeconds(secs);
                            date_here.setHours(0, 0, 0);
                            if (today <= date_here) {
                                fetched_sub_w_CES.push(data_here);
                            }
                        }
                    }
                });

                setSubjectArr(fetched_sub_w_CES);
                if (fetched_sub_w_CES?.length) {
                    setSubjectMap(fetched_sub_w_CES[0]);
                    setSubject(fetched_sub_w_CES[0]['SubjectID']);
                    setQuesArr(fetched_sub_w_CES[0]['Question_List']);
                    const newOptionsDict = {};
                    fetched_sub_w_CES[0]['Question_List'].forEach((ques) => {
                        newOptionsDict[ques['tag']] = 'A';
                    });
                    setOptionsDict(newOptionsDict);
                } else {
                    setSubject(null);
                    setQuesArr([]);
                }
            }
        } catch (error) {
            console.error("Data Fetch Issue⚠", error);
            alert(`Data Fetch Issue⚠ ${error.message}`);
        }
    };

    useEffect(() => {
        if (state) {
            fetch_and_update_subject();
        }
    }, [state]);

    const goBack = () => navigate(-1);

    const handleSubjectChange = (e) => {
        const sub_id = e.target.value;
        const sub_index = subjectArr.findIndex(sub => sub.SubjectID === sub_id);
        if (sub_index !== -1) {
            setSubject(sub_id);
            setSubjectMap(subjectArr[sub_index]);
            setQuesArr(subjectArr[sub_index]['Question_List']);
            const newOptionsDict = {};
            subjectArr[sub_index]['Question_List'].forEach((ques) => {
                newOptionsDict[ques['tag']] = 'A';
            });
            setOptionsDict(newOptionsDict);
        }
    };

    const handleSubmit = async () => {
        if (!quesArr.length) return;

        setIsSubmitting(true);
        try {
            const survey_id = subjectMap['Survey_ID'];
            const subject_id = subject;
            const survey_response_unique_id = survey_id + stu_email;

            await setDoc(doc(db, "CESResponses", survey_response_unique_id), {
                Responses: optionsDict,
                Survey_ID: survey_id,
                StudentEmail: stu_email,
                SubjectID: subject_id,
                Enrolment_No: state.student['Enrolment_No'],
            });

            await setDoc(doc(db, "Student", stu_email), {
                CES_Remaining: arrayRemove(subject_id)
            }, { merge: true });

            setSubmitSuccess(true);
            setTimeout(() => {
                setSubmitSuccess(false);
                local_update_subject(subject_id);
            }, 3000);
        } catch (error) {
            console.error("Submission Error:", error);
            alert(`Submission Issue⚠ ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!state) {
        return <AuthIssueComponent />;
    }

    if (subjectArr.length <= 0) {
        return (
            <div className="no-survey-container">
                <button className="styled-button back-button" onClick={goBack}>
                    ← Back
                </button>
                <div className="no-survey-message">
                    <h3>No Course Exit Surveys Available</h3>
                    <p>There are currently no active surveys for you to complete.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="student-ces-container">
            <Card className="survey-card">
                <div className="card-header">
                    <img className="institute-logo" src={img1} alt="Institute Logo" />
                    <h2 className="survey-title">Course Exit Survey Response Form</h2>
                </div>

                <div className="card-body">
                    <div className="subject-selection">
                        <label htmlFor="subject-select" className="subject-label">
                            Select Subject:
                        </label>
                        <select
                            id="subject-select"
                            className="subject-select"
                            value={subject}
                            onChange={handleSubjectChange}
                        >
                            {subjectArr.map((sub) => (
                                <option key={sub.SubjectID} value={sub.SubjectID}>
                                    {sub.Name} ({sub.SubjectID})
                                </option>
                            ))}
                        </select>
                    </div>

                    {submitSuccess && (
                        <div className="success-message">
                            ✅ Survey submitted successfully! Thank you for your feedback.
                        </div>
                    )}

                    <div className="questions-container">
                        {quesArr.map((ques, index) => (
                            <div key={ques.tag} className="question-card">
                                <div className="question-text">
                                    Q{index + 1}. {ques.question_prompt}
                                </div>
                                <div className="options-container">
                                    {['A', 'B', 'C', 'D'].map((option) => (
                                        <label key={option} className="option-label">
                                            <input
                                                type="radio"
                                                name={ques.tag}
                                                value={option}
                                                checked={optionsDict[ques.tag] === option}
                                                onChange={(e) => handleMultiRadioChange(e, ques.tag)}
                                                className="option-radio"
                                            />
                                            <span className="option-text">
                                                {ques[`option_${option}`]}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="action-buttons">
                        <button
                            className="submit-button"
                            onClick={handleSubmit}
                            disabled={isSubmitting || quesArr.length === 0}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Survey'}
                        </button>
                        <button className="back-button" onClick={goBack}>
                            ← Back
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default StudentCESResponsePage;
