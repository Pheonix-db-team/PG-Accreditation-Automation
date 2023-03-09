import React from 'react';
//import { auth } from '../config/firebase';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
//import { useNavigate } from "react-router-dom";
import { student_test_email } from "../App.js";

function StudentDashboard() {
    //const navigate = useNavigate();
    const [student, setStudent] = useState({});
    useEffect(() => {

        const fetchDetails = async () => {

            //Read data
            try {
                //const curr = auth.currentUser;
                //const email = curr?.email;
                // console.log("Welcome " + email);

                const data = await getDoc(doc(db, "Student", student_test_email));
                const filtered_data = data.data();
                console.log("Fetched data");
                console.log(filtered_data);
                setStudent(filtered_data);
                // return filtered_data;

            }
            catch (err) {
                console.error(err);
                //return "";
            }

        }; fetchDetails();
        console.log("Student obj");

    }
        , []);
    console.log(student);
    return (

        <div className='div-margin'>Student Dashboard
            <br></br>
            Name :{student['Name']}
            <br></br>
            Email :{student['EmailID']}
            <br></br>
            Department :{student['Department']}
            <br></br>
            {/* if(if (Array.isArray(array) && array.length) {
    // array exists and is not empty
}) */}
            Courses_Registered status:{(Array.isArray(student['Courses_Registered']) && student['Courses_Registered'].length) ? "✅" : "❌"}
            <br></br>



        </div>
    )
}

export default StudentDashboard