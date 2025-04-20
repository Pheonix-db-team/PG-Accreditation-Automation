import React from 'react';
import { useState, useEffect } from 'react';
import { getDoc, doc, getDocs, collection } from 'firebase/firestore';
import { db, } from '../config/firebase';
import { useNavigate, useLocation } from "react-router-dom";
import AuthIssueComponent from '../components/AuthIssueComponent';
import Card from 'react-bootstrap/Card';

import img1 from '../image/NiTC1.png';
function FacultyDashboard() {
    const navigate = useNavigate();
    const { state } = useLocation();
    function addCESPageNavigation() {
        console.log("CES Button tapped Calling navigation ")
        navigate('/addces', { state: { fac: state.fac } });

    }
    const SubjectListPageNavigation = async () => {
        var filtered_data = [];
        try {
            const data = await getDocs(collection(db, "subject"));
            filtered_data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log(filtered_data);
        }
        catch (err) {
            console.error(err);
            alert("⚠" + err.message);
        }
        console.log("Subject List Page tapped Calling navigation ")
        navigate('/subjectlist', { state: { student: state.student, subject_arr: filtered_data } });
    }
    const [fac, setFac] = useState(state ? state.fac : {});

    useEffect(() => {
        console.log("Dashboard state")
        console.log(state);
        const fetchDetails = async () => {
            try {
                const data = await getDoc(doc(db, "faculty", state.fac_email));
                const filtered_data = data.data();
                console.log("Fetched data");
                console.log(filtered_data);
                setFac(filtered_data);
            }
            catch (error) {
                console.error(error);
                console.log(error.code)
                alert("⚠" + error.message);
            }
        };
    }
        , []);
    if (!state) {
        return AuthIssueComponent();
    }
    return (
      <div className="dashboard-page" style={{
        background: '#f0f2f5', // Solid light gray background
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif' // Consistent font
      }}>
        <div className="card-container" style={{ width: '100%', maxWidth: '500px' }}>
          <Card className="sitecard" style={{
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
            border: 'none',
            background: 'white' // Solid white card background
          }}>
            {/* Header with logo */}
            <div style={{
              background: '#103e82', // Solid dark blue header
              padding: '30px 0',
              textAlign: 'center'
            }}>
              {/* <img
                className="showlogo"
                src={img1}
                style={{
                  width: '120px',
                  filter: 'brightness(0) invert(1)' // Makes logo white
                }}
                alt="Logo"
              /> */}
            </div>

            {/* Content */}
            <div className="contentalign" style={{
              padding: '30px',
              color: '#333' // Dark gray text for better readability
            }}>
              <h2 style={{
                color: '#103e82', // Dark blue heading
                textAlign: 'center',
                marginBottom: '25px',
                position: 'relative',
                fontSize: '24px',
                fontWeight: '700'
              }}>
                Faculty Dashboard
                <div style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: '25%',
                  width: '50%',
                  height: '3px',
                  background: '#103e82',
                  borderRadius: '3px'
                }}></div>
              </h2>

              {/* Profile Info */}
              <div style={{
                background: '#f8f9fa', // Light gray background
                borderRadius: '10px',
                padding: '20px',
                marginBottom: '25px',
                border: '1px solid #e9ecef' // Subtle border
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr',
                  gap: '10px',
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
                  <span style={{ fontWeight: '600', color: '#103e82' }}>Name:</span>
                  <span>{fac['Name']}</span>

                  <span style={{ fontWeight: '600', color: '#103e82' }}>Email:</span>
                  <span>{fac['EmailID']}</span>

                  <span style={{ fontWeight: '600', color: '#103e82' }}>Department:</span>
                  <span>{fac['Department']}</span>
                </div>

                {/* Subjects */}
                <div>
                  <div style={{
                    fontWeight: '600',
                    color: '#103e82',
                    marginBottom: '10px'
                  }}>
                    Subjects:
                  </div>
                  {fac['Courses_assigned']?.length > 0 ? (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                      gap: '8px'
                    }}>
                      {fac['Courses_assigned'].map((course) => (
                        <div key={course} style={{
                          background: '#e9f0f7',
                          padding: '8px',
                          borderRadius: '6px',
                          textAlign: 'center',
                          fontSize: '14px',
                          color: '#103e82',
                          border: '1px solid #d6e4f0'
                        }}>
                          {course}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      color: '#6c757d',
                      fontStyle: 'italic',
                      textAlign: 'center',
                      padding: '10px'
                    }}>
                      No subjects assigned
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="button-group" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px',
                marginTop: '20px'
              }}>
                <button
                  onClick={() => addCESPageNavigation()}
                  style={{
                    background: '#103e82',
                    color: 'white',
                    padding: '12px',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  Add CES
                </button>
                <button
                  onClick={() => SubjectListPageNavigation()}
                  style={{
                    background: '#2c7be5',
                    color: 'white',
                    padding: '12px',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  View CES
                </button>
                <button
                  onClick={() => navigate(-1)}
                  style={{
                    background: '#e63757',
                    color: 'white',
                    padding: '12px',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    gridColumn: '1 / -1'
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>

    );


}

export default FacultyDashboard
