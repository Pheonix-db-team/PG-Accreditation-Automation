import React from 'react'
import { useState, useEffect } from 'react';
import { doc, setDoc, getDocs, collection, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLocation } from 'react-router-dom';
import { departments, getValueByKey } from "../App.js";
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import '../App.css';
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

    return (
        <Card className='studentcard'>
            <div>
                <img className='showlogo' src={img1} width="15%" />
            </div>
            <div>
                <br></br>
                <div className='contentalign'>

                <form onSubmit={handleSubmit
                }>
                    <div ><h2><b>Add subject</b></h2> </div>
                    <br></br>
                    
                    <div><b>Subject ID:</b>
                        <input type="text" value={subjectID} onChange={(e) => setsubjectID(e.target.value)} placeholder='must be unique' required></input>
                    </div>
                    <br></br>
                    {/* *subject ID must be unique */}
                    {/* <br></br> */}
                    <div><b>Subject Name:</b>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Subject name' required></input>
                    </div>
                    <br></br>
                    {department}
                    {/* <br></br> */}
                    {/* {"⬇️ Select department ⬇️"} */}
                    {/* <br></br> */}
                    <div><b>Select Department:</b>
                        <select onChange={handleDepartmentChange}>

                            {departments.map((department) => <option key={department.label
                            } value={department.value}>{department.label}</option>)}
                        </select>
                    </div>
                    <br></br>
                    {/* {"⬇️ Assign Faculty ⬇️"} */}

                    <div><b>Select Faculty:</b>
                        <select onChange={handleFacultyChange}>

                            {faculties_from_prop.map((faculty) => <option key={faculty.Name
                            } value={faculty.EmailID}>{faculty.Name}</option>)}
                        </select>
                    </div>
                    
                    <br></br>
                       <div>
                          <input type="submit" className='styledbutton'></input>
                          <button className='styledbutton' onClick={() => navigate(-1)}>Back</button>
                         </div>

                </form>
                </div>

            </div>
        </Card>
    )
}

export default AddSubjectPage