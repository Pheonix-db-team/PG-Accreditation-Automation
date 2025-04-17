import React from 'react'
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../config/firebase'
import { getDocs, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigate, useLocation } from "react-router-dom";
import { password_from_prop, email_from_prop, departments, isValidEmail } from "../App.js";
import AuthIssueComponent from '../components/AuthIssueComponent';
import Card from 'react-bootstrap/Card';
import img1 from '../image/NiTC1.png';
function FacultySignupPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const { state } = useLocation();
    const [password, setPassword] = useState("");
    const [facultyID, setFacultyID] = useState("");
    const [name, setName] = useState("");
    const [department, setDepartment] = useState(departments[0].value)
    useEffect(() => {
        const fetchListTest = async () => {
            //Read data
            try {
                const data = await getDocs(collection(db, "faculty"));
                const filtered_data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                console.log(filtered_data);
            }
            catch (err) {
                alert("⚠" + err.message);
                console.error(err);
            }

        }; fetchListTest();
    }
        , []);

    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!(email && email.length && email.match(isValidEmail))) {
            alert("Invalid email")
        }
        const docRefCheck = doc(db, "faculty", email);
        //var docRefcheck = db.collection("faculty").doc(email);
        var docSnap = ""
        try { docSnap = await getDoc(docRefCheck); } catch (e) {
            alert(e.message);
        }

        if (docSnap.exists()) {
            alert("Faculty email already exists")
            return -1;
            //console.log("Document data:", docSnap.data());
        }
        const docRef = await setDoc(doc(db, "faculty", email), {
            Courses_assigned: [], Department: department, EmailID: email,
            FacultyID: facultyID, Name: name
        });
        console.log(docRef);
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // console.log("You are " + userCredential.user.email);
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert("Error " + errorMessage);
            });
        console.log("Now you are " + auth.currentUser.email);
        await signInWithEmailAndPassword(auth, email_from_prop, password_from_prop)
            .then((userCredential) => {
            })
            .catch((error) => {
                alert("⚠" + error.message);

            });
        console.log("Finally You are " + auth.currentUser.email);
        alert("Added " + facultyID + " with name " + name);

        //  alert("Added " + enrolmentNo + " with name " + name)
        setEmail('');
        setPassword('');
        setFacultyID('');
        setDepartment('');
        setName('');
    }
    if (!(state && state.admin)) {
        return AuthIssueComponent();
    }

    return (
        <div className="add-faculty-page" style={{
            background: 'linear-gradient(135deg, #103e82 0%, #0c2e66 100%)',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
          }}>
            <Card className="sitecard" style={{
              width: '100%',
              maxWidth: '600px',
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

              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img className="showlogo" src={img1} width="80px" alt="logo" style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }} />
              </div>

              <div className="contentalign">
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <h2 style={{
                    color: '#103e82',
                    textAlign: 'center',
                    marginBottom: '30px',
                    position: 'relative',
                    fontSize: '28px'
                  }}>
                    <b>Add Faculty</b>
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

                  <div className="form-group" style={{ marginBottom: '25px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      color: '#103e82',
                      fontWeight: '600'
                    }}>Faculty ID:</label>
                    <input
                      type="text"
                      value={facultyID}
                      onChange={(e) => setFacultyID(e.target.value)}
                      placeholder="Must be unique"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        fontSize: '16px',
                        transition: 'all 0.3s',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                      }}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '25px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      color: '#103e82',
                      fontWeight: '600'
                    }}>Faculty Name:</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Faculty name"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        fontSize: '16px',
                        transition: 'all 0.3s',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                      }}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '25px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      color: '#103e82',
                      fontWeight: '600'
                    }}>Select Department:</label>
                    <select
                      onChange={handleDepartmentChange}
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        fontSize: '16px',
                        transition: 'all 0.3s',
                        appearance: 'none',
                        background: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E") no-repeat',
                        backgroundPosition: 'right 10px center',
                        backgroundSize: '1em',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                      }}
                    >
                      {departments.map((department) => (
                        <option key={department.label} value={department.value}>
                          {department.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: '25px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      color: '#103e82',
                      fontWeight: '600'
                    }}>Email:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        fontSize: '16px',
                        transition: 'all 0.3s',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                      }}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '30px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      color: '#103e82',
                      fontWeight: '600'
                    }}>Password:</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        fontSize: '16px',
                        transition: 'all 0.3s',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                      }}
                    />
                  </div>

                  <div className="button-group" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    marginTop: '20px'
                  }}>
                    <input
                      type="submit"
                      className="styledbutton"
                      value="Submit"
                      style={{
                        background: 'linear-gradient(135deg, #103e82 0%, #0c2e66 100%)',
                        color: 'white',
                        padding: '12px 30px',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    />
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
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    >
                      Back
                    </button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
    )
}

export default FacultySignupPage
