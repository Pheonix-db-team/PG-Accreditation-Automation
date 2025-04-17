import React from 'react'
import { useState, useEffect } from 'react';
import { doc, setDoc, getDocs, collection, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLocation } from 'react-router-dom';
import { departments, getValueByKey } from "../App.js";
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import img1 from '../image/NiTC1.png';
function AddSubjectPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const faculties_from_prop = state.faculty_arr;
    const [subjectID, setsubjectID] = useState("");
    const [name, setName] = useState("");
    const [department, setDepartment] = useState(departments[0].value)

    const [faculty, setFaculty] = useState(faculties_from_prop[0].EmailID)



    useEffect(() => {
        const fetchListTest = async () => {

            //Read data
            try {
                const data_1 = await getDocs(collection(db, "subject"));

                const filtered_data_1 = data_1.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                console.log(filtered_data_1);

                const data_2 = await getDocs(collection(db, "faculty"));

                const filtered_data_2 = data_2.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                console.log(filtered_data_2);

            }
            catch (err) {
                console.error(err);
                alert("⚠" + err.message);
            }

        }; fetchListTest();
    }
        , []);

    const handleFacultyChange = (e) => {
        setFaculty(e.target.value);
        console.log(faculty);
    }
    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value)
    }
    const handleSubmit = async (event) => {

        event.preventDefault();
        try {
            const docRefCheck = doc(db, "subject", subjectID);
            //var docRefcheck = db.collection("faculty").doc(email);
            var docSnap = ""
            try { docSnap = await getDoc(docRefCheck); } catch (e) {
                alert(e.message);
            }

            if (docSnap.exists()) {
                alert("Subject id already exists")
                return -1;
                //console.log("Document data:", docSnap.data());
            }
            console.log(faculty);
            const docRef = await setDoc(doc(db, "subject", subjectID), {
                SubjectID: subjectID,
                Name: name,
                Department: department,
                Faculty_Assigned: faculty,
                CourseExitSurveyAvailable: false,
                Question_List: [],
                last_date: null,
                Students_Enrolled: [],



            });

            console.log(docRef);
            const fac_index = getValueByKey(faculties_from_prop, "EmailID", faculty);
            console.log("Found at " + faculties_from_prop[fac_index]);
            console.log(faculties_from_prop[fac_index].Courses_assigned);
            const docRef1 = await setDoc(doc(db, "faculty", faculty), {
                Courses_assigned: arrayUnion(subjectID),

            }, { merge: true });
            alert("Added " + name);
            console.log("DocRef ", docRef1);
            console.log("Added " + subjectID + " with name " + name);
            setsubjectID('');
            setDepartment('');
            setName('');
        } catch (e) {
            alert("error " + e.message);
        }

    }
    const inputStyle = {
      width: '100%',
      padding: '12px 15px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '16px',
      transition: 'all 0.3s',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
    };

    const selectStyle = {
      ...inputStyle,
      appearance: 'none',
      background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E") no-repeat',
      backgroundPosition: 'right 10px center',
      backgroundSize: '1em'
    };

    const submitButtonStyle = {
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
    };

    const backButtonStyle = {
      ...submitButtonStyle,
      background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)'
    };
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
    maxWidth: '600px',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    background: 'rgba(255, 255, 255, 0.95)',
    position: 'relative',
    overflow: 'hidden'
  }}>
    {/* Decorative corners */}
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

    {/* Logo */}
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <img className="showlogo" src={img1} width="80px" alt="logo" style={{
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
      }} />
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <h2 style={{
        color: '#103e82',
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '28px',
        position: 'relative'
      }}>
        <b>Add Subject</b>
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

      {/* Subject ID */}
      <div className="form-group" style={{ marginBottom: '25px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: '#103e82', fontWeight: '600' }}>Subject ID:</label>
        <input
          type="text"
          value={subjectID}
          onChange={(e) => setsubjectID(e.target.value)}
          placeholder="Must be unique"
          required
          style={inputStyle}
        />
      </div>

      {/* Subject Name */}
      <div className="form-group" style={{ marginBottom: '25px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: '#103e82', fontWeight: '600' }}>Subject Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Subject Name"
          required
          style={inputStyle}
        />
      </div>

      {/* Department */}
      <div className="form-group" style={{ marginBottom: '25px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: '#103e82', fontWeight: '600' }}>Select Department:</label>
        <select onChange={handleDepartmentChange} style={selectStyle}>
          {departments.map((department) => (
            <option key={department.label} value={department.value}>{department.label}</option>
          ))}
        </select>
      </div>

      {/* Faculty */}
      <div className="form-group" style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: '#103e82', fontWeight: '600' }}>Select Faculty:</label>
        <select onChange={handleFacultyChange} style={selectStyle}>
          {faculties_from_prop.map((faculty) => (
            <option key={faculty.Name} value={faculty.EmailID}>{faculty.Name}</option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="button-group" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <input
          type="submit"
          value="Submit"
          className="styledbutton"
          style={submitButtonStyle}
        />
        <button
          className="styledbutton"
          onClick={() => navigate(-1)}
          style={backButtonStyle}
        >
          Back
        </button>
      </div>
    </form>
  </Card>
</div>

    )
}

export default AddSubjectPage
