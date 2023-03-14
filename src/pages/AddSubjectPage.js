import React from 'react'
import { useState, useEffect } from 'react';
import { doc, setDoc, getDocs, collection, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebase';
import { faculties_arr_test, departments, getValueByKey } from "../App.js";
function AddSubjectPage() {

    const faculties_from_prop = faculties_arr_test;
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

    }

    return (
        <div>
            <br></br>
            <form onSubmit={handleSubmit
            }>
                <div > Add subject</div>
                <br></br>
                subject ID
                <br></br>
                <input type="text" value={subjectID} onChange={(e) => setsubjectID(e.target.value)}></input>
                <br></br>
                *subject ID must be unique
                <br></br>
                subject Name
                <br></br>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                <br></br>
                {department}
                <br></br>
                {"⬇️ Select department ⬇️"}
                <br></br>
                <select onChange={handleDepartmentChange}>

                    {departments.map((department) => <option key={department.label
                    } value={department.value}>{department.label}</option>)}
                </select>
                <br></br>
                {"⬇️ Assign Faculty ⬇️"}
                <br></br>
                <select onChange={handleFacultyChange}>

                    {faculties_from_prop.map((faculty) => <option key={faculty.Name
                    } value={faculty.EmailID}>{faculty.Name}</option>)}
                </select>
                <br></br>
                <input type="submit"></input>
            </form>

        </div>
    )
}

export default AddSubjectPage