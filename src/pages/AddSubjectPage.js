import React from 'react'
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { faculties_arr_test, departments } from "../App.js";
import { Alert } from 'bootstrap';
function AddSubjectPage() {
    // const password_from_prop = "test123";
    // const email_from_prop = "test1@gmail.com";
    // const departments = [
    //     { label: "COMPUTER SCIENCE AND ENGINEERING", value: "COMPUTER SCIENCE AND ENGINEERING" },
    //     { label: "ELECTRICAL ENGINEERING", value: "ELECTRICAL ENGINEERING" },
    //     { label: "MECHANICAL ENGINEERING", value: "MECHANICAL ENGINEERING" }

    // ]
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const faculties_from_prop = faculties_arr_test;
    const [subjectID, setsubjectID] = useState("");
    const [name, setName] = useState("");
    const [department, setDepartment] = useState(departments[0].value)

    const [faculty, setFaculty] = useState(faculties_from_prop[0].EmailID)




    // useEffect(() => {
    //     const fetchListTest = async () => {

    //         //Read data
    //         try {
    //             const data = await getDocs(collection(db, "subject"));

    //             const filtered_data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //             console.log(filtered_data);

    //         }
    //         catch (err) {
    //             console.error(err);
    //         }

    //     }; fetchListTest();
    // }
    //     , []);

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
        alert("Added " + name);
        console.log(docRef);
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