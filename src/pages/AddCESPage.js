import React from 'react'
import { useState, useEffect } from 'react';
import { doc, setDoc, getDocs, collection, arrayUnion, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { faculty_test_email, departments, getValueByKey, faculties_arr_test } from "../App.js";

function AddCESPage() {
    const faculties_from_prop = faculties_arr_test;
    const faculty_mail_from_prop = faculty_test_email;
    const [subjectID, setsubjectID] = useState("");
    const [questionPrompt, setQuestionPrompt] = useState("");
    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionC, setOptionC] = useState("");
    const [optionD, setOptionD] = useState("");
    const [subject, setSubject] = useState("No department Available")
    const [subjectArr, setSubjectArr] = useState([])



    useEffect(() => {
        const fetch_and_update_subject = async () => {

            //Read data
            try {
                const subjectsRef = collection(db, "subject");
                const query_x = query(subjectsRef, where("Faculty_Assigned", "==", faculty_mail_from_prop), where("CourseExitSurveyAvailable", "==", false));
                const querySnapshot = await getDocs(query_x);
                //console.log(querySnapshot);
                const fetched_sub_wo_CES = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    fetched_sub_wo_CES.push(doc.data());
                });
                setSubjectArr(fetched_sub_wo_CES);
                setSubject(subjectArr[0]);
                console.log(fetched_sub_wo_CES);

                //const filtered_data_1 = data_1.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                //console.log(filtered_data_1);

                // const data_2 = await getDocs(collection(db, "faculty"));

                // const filtered_data_2 = data_2.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                // console.log(filtered_data_2);
                // const sub_fetched_arr=filtered_data_2;


            }
            catch (err) {
                console.error(err);
            }

        }; fetch_and_update_subject();
    }
        , []);


    const handleSubjectChange = (e) => {
        setSubject(e.target.value)
    }
    const handleSubmit = async (event) => {

        event.preventDefault();
        //console.log(faculty);
        const docRef = await setDoc(doc(db, "subject", subjectID), {
            SubjectID: subjectID,
            Name: questionPrompt,
            Department: subject,
            // Faculty_Assigned: faculty,
            CourseExitSurveyAvailable: false,
            Question_List: [],
            last_date: null,
            Students_Enrolled: [],



        });

        console.log(docRef);
        //const fac_index = getValueByKey(faculties_from_prop, "EmailID", faculty);
        // console.log("Found at " + faculties_from_prop[fac_index]);
        // console.log(faculties_from_prop[fac_index].Courses_assigned);
        // const docRef1 = await setDoc(doc(db, "faculty", faculty), {
        //     Courses_assigned: arrayUnion(subjectID),

        // }, { merge: true });
        // alert("Added " + questionPrompt);
        // console.log("DocRef ", docRef1);
        // console.log("Added " + subjectID + " with name " + questionPrompt);
        setsubjectID('');
        setSubject('');
        setQuestionPrompt('');

    }

    return (
        <div>
            <br></br>
            <form onSubmit={handleSubmit
            }>
                <div > Add CES</div>
                <br></br>
                {"⬇️ Select Subject ⬇️"}
                <br></br>
                <div>
                    <select onChange={handleSubjectChange}>

                        {subjectArr.map((sub) => <option key={sub.SubjectID
                        } value={sub.SubjectID}>{sub.Name}</option>)}
                    </select>
                </div>
                <br></br>

                Question Prompt
                <br></br>
                <input type="text" value={questionPrompt} onChange={(e) => setQuestionPrompt(e.target.value)}></input>
                <br></br>
                <br></br>
                OptionA
                <br></br>
                <input type="text" value={optionA} onChange={(e) => setOptionA(e.target.value)}></input>
                <br></br>
                OptionB
                <br></br>
                <input type="text" value={optionB} onChange={(e) => setOptionB(e.target.value)}></input>
                <br></br>
                OptionC
                <br></br>
                <input type="text" value={optionC} onChange={(e) => setOptionC(e.target.value)}></input>
                <br></br>
                OptionD
                <br></br>
                <input type="text" value={optionD} onChange={(e) => setOptionD(e.target.value)}></input>
                <br></br>

                <input type="submit"></input>
            </form>

        </div>
    )
}

export default AddCESPage