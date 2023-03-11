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
            const CES_Remaining_arr = [...state.student['CES_Remaining']];

            //  var today = Timestamp.fromDate(new Date());
            const today = new Date().setHours(0, 0, 0);
            console.log(student['Courses_Registered'])
            //where("SubjectID", "in", student['Courses_Registered'])
            const query_x = query(subjectsRef, where("CourseExitSurveyAvailable", "==", true), where("SubjectID", "in", ['DS', 'CS101']),
                where("last_date", ">=", today),);
            //ces av. subjects
            //   const querySnapshot = await getDocs(query_x);
            const querySnapshot = await getDocs(subjectsRef);
            const fetched_sub_w_CES = []
            console.log("Responses")
            querySnapshot.forEach((doc) => {
                const data_here = doc.data();

                if (CES_Remaining_arr.includes(data_here['SubjectID'])) {
                    const date_here = new Date(0);
                    if (data_here['CourseExitSurveyAvailable'] && data_here['last_date']) {

                        const secs = data_here['last_date']['seconds']
                        date_here.setUTCSeconds(secs);
                        date_here.setHours(0, 0, 0);

                        // console.log(data_here);
                        if (today <= date_here) {
                            console.log("seconds " + date_here);
                            console.log(data_here['SubjectID']);
                            fetched_sub_w_CES.push(data_here);
                        }
                    }
                    //date_here.setUTCSeconds(data_here[last_date])
                    // const ts_obj = new Timestamp(data_here['last_date']);
                    //const data_date = ts_obj.toDate();
                    //console.log("Date " + data_date);

                };
            });




        }
        catch (error) {
            //console.error(error);

            //console.log(error.code)
            alert("Data Fetch Issue⚠" + error.message);
            console.log(error.message);
        }
    }
    function CESResponsePageNavigation() {
        console.log("CES Button tapped Calling navigation ")
        navigate('/studentcesresponse', { state: { student: state.student } });

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
        //subjectCESAv();
        // console.log("Student obj");

    }
        , []);
    console.log(student);
    return (
        <body>
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
            <button className='styledbutton' onClick={() => CESResponsePageNavigation()}>CES Available</button>
        </body>
    )
}

export default StudentDashboard