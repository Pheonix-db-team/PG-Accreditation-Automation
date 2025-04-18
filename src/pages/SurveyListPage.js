import React from 'react'
import { useEffect, useState } from 'react'
import { deleteDoc, getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';
import { useNavigate, useLocation } from "react-router-dom";
import AuthIssueComponent from '../components/AuthIssueComponent';
import Card from 'react-bootstrap/Card';

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
        return (
            <div className="add-subject-page" style={{
                background: 'linear-gradient(135deg, #103e82 0%, #0c2e66 100%)',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px'
              }}>
                <Card className="sitecard" style={{
                  width: '100%',
                  maxWidth: '800px',
                  padding: '40px',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Decorative elements */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(45deg, #103e82, #0c2e66)',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
                    opacity: 0.8
                  }}></div>

                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(45deg, #103e82, #0c2e66)',
                    clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
                    opacity: 0.8
                  }}></div>

                  <h2 style={{
                    color: '#103e82',
                    textAlign: 'center',
                    marginBottom: '30px',
                    position: 'relative',
                    fontSize: '28px'
                  }}>
                    <b>Survey of {state.subject['Name']}</b>
                    <div style={{
                      position: 'absolute',
                      bottom: '-10px',
                      left: '25%',
                      width: '50%',
                      height: '4px',
                      background: 'linear-gradient(90deg, #103e82, #0c2e66)',
                      borderRadius: '2px'
                    }}></div>
                  </h2>

                  <div style={{ overflowX: 'auto' }}>
                    <table style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      marginBottom: '30px'
                    }}>
                      <thead>
                        <tr style={{
                          background: 'linear-gradient(135deg, #103e82 0%, #0c2e66 100%)',
                          color: 'white'
                        }}>
                          <th style={{ padding: '12px 15px', textAlign: 'left' }}>SemesterID</th>
                          <th style={{ padding: '12px 15px', textAlign: 'left' }}>Faculty Name</th>
                          <th style={{ padding: '12px 15px', textAlign: 'center' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {surveyListArr.map((survey) => (
                          <tr key={survey.Sem_ID} style={{
                            borderBottom: '1px solid #ddd',
                            '&:hover': { backgroundColor: '#f5f5f5' }
                          }}>
                            <td style={{ padding: '12px 15px' }}>{survey.Sem_ID}</td>
                            <td style={{ padding: '12px 15px' }}>{survey.faculty_name}</td>
                            <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                              <button
                                className="styledbutton"
                                onClick={() => handleTap(survey)}
                                style={{
                                  background: 'linear-gradient(135deg, #103e82 0%, #0c2e66 100%)',
                                  color: 'white',
                                  padding: '8px 16px',
                                  border: 'none',
                                  borderRadius: '8px',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s',
                                  '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                                  }
                                }}
                              >
                                View Responses
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <button
                      className="styledbutton"
                      onClick={() => navigate(-1)}
                      style={{
                        background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
                        color: 'white',
                        padding: '12px 30px',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
                        }
                      }}
                    >
                      Back
                    </button>
                  </div>
                </Card>
              </div>

    )
    }

}

export default SurveyListPage
