import React from 'react';
//import { auth } from '../config/firebase';
import { useState, useEffect } from 'react';
import { getDocs, collection, setDoc, getDoc, doc, query, where, Timestamp } from 'firebase/firestore';

import { db } from '../config/firebase';
import { useNavigate, useLocation } from "react-router-dom";
import { student_test_email } from "../App.js";
//import { doc, getDoc } from 'firebase/firestore';
function StudentDashboard() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [student, setStudent] = useState({});
    async function subjectCESAv() {
        try {
            const subjectsRef = collection(db, "subject");

            var today = Timestamp.fromDate(new Date());
            console.log(student['Courses_Registered'])
            //where("SubjectID", "in", student['Courses_Registered'])
            const query_x = query(subjectsRef, where("CourseExitSurveyAvailable", "==", true), where("SubjectID", "in", state.student['CES_Remaining']),
                where("last_date", ">=", today),);
            //ces av. subjects
            const querySnapshot = await getDocs(query_x);

            const fetched_sub_w_CES = []
            console.log("Responses")
            querySnapshot.forEach((doc) => {
                console.log(doc.data());

                fetched_sub_w_CES.push(doc.data()['Name']);
            });
            //          setSubjectArr(fetched_sub_wo_CES);
            //        console.log(fetched_sub_wo_CES);
            //console.log("subID to set in dropdown " + fetched_sub_wo_CES[0].SubjectID);
            //            setSubject(fetched_sub_wo_CES[0].SubjectID);




        }
        catch (error) {
            //console.error(error);

            //console.log(error.code)
            alert("Data Fetch Issue⚠" + error.message);
            console.log(error.message);
        }
    }
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

        }; //fetchDetails();
        setStudent(state.student);
        subjectCESAv();
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