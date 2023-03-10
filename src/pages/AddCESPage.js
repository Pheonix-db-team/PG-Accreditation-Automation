import React from 'react'
import { useState, useEffect } from 'react';
import { doc, setDoc, getDocs, collection, arrayUnion, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { faculty_test_email, departments, getValueByKey, faculties_arr_test } from "../App.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddCESPage() {
    const faculty_mail_from_prop = faculty_test_email;
    const [questionPrompt, setQuestionPrompt] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionC, setOptionC] = useState("");
    const [optionD, setOptionD] = useState("");
    const [subject, setSubject] = useState("No Subject Available")
    const [quesArr, setQuesArr] = useState([])
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
                console.log(fetched_sub_wo_CES);
                console.log("subID to set in dropdown " + fetched_sub_wo_CES[0].SubjectID);
                setSubject(fetched_sub_wo_CES[0].SubjectID);


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

    function getSemID() {
        // M monsoon W winter
        const date_today = new Date();
        const year_now = date_today.getFullYear();
        const month_now = date_today.getMonth();
        const sem_char = (month_now <= 5) ? 'Monsoon' : 'Winter';//zero based
        const curr_sem_id = sem_char + year_now;

        return curr_sem_id
    }
    const handleSubjectChange = (e) => {
        setSubject(e.target.value)
    }
    const handleDelete = (deleting_ques) => {
        console.log("Delete function called on " + deleting_ques.question_prompt)
        const ques_arr_temp_del = quesArr.filter((ques) => ques.tag !== deleting_ques.tag);
        //prevent redirect to oth. page
        setQuesArr(ques_arr_temp_del)
        // alert("Ques Deleted!");
    }
    const handleAddQuestion = async (event) => {

        event.preventDefault();
        console.log("Before")
        console.log(quesArr);
        const temp_index = quesArr.length;
        let temp_ques_arr = [];
        if (quesArr.length) {
            temp_ques_arr = [...quesArr];
        }

        //         y.map(({ myVariable }) =>
        //         temp_ques_arr.push({
        //       myVariable: false
        //     })
        // );
        const dict_temp = {
            tag: temp_index,
            question_prompt: questionPrompt,
            option_A: optionA,
            option_B: optionB,
            option_C: optionC,
            option_D: optionD,
        }
        // dict_temp[temp_index] = {
        //     question_prompt: questionPrompt,
        //     option_A: optionA,
        //     option_B: optionB,
        //     option_C: optionC,
        //     option_D: optionD,

        // }

        temp_ques_arr.push(
            dict_temp
        );
        // console.log(temp_ques_arr);
        // setQuesArr([
        //     [...quesArr],
        //     dict_temp,
        // ]);
        console.log("curr " + dict_temp[temp_index])
        setQuesArr(temp_ques_arr);

        // setQuestionPrompt('');
        // setOptionA('');
        // setOptionB('');
        // setOptionC('');
        // setOptionD('');
        console.log(quesArr);
    }
    const handleSubmit = async (event) => {
        // const test_survey_id = "ldnk"
        //const test_sem_id = "W22"
        // event.preventDefault();
        const sem_id = getSemID();
        console.log("sem ID " + sem_id);
        const survey_id = subject + sem_id;
        console.log("survey ID " + survey_id);
        const docRef = await setDoc(doc(db, "survey", survey_id), {
            Question_List: quesArr, facultyEmail: faculty_mail_from_prop,
            Survey_ID: survey_id, Sem_ID: sem_id, SubjectID: subject
        });
        const docRef1 = await setDoc(doc(db, "subject", subject), {
            "Question_List": quesArr, "CourseExitSurveyAvailable": true,
            "last_date": startDate,
        }, { merge: true });

        console.log(docRef);
        console.log("Added " + survey_id);


    }
    return (
        <body>
            <br></br>
            <form onSubmit={handleAddQuestion
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

                <input type="submit" value="Add" ></input>
            </form>

            <br></br>
            CES Closing Date
            <div>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

            </div>
            <div>
                <button className='styledbutton' onClick={() => handleSubmit()}>Submit CES</button>
                Questions
                {

                    quesArr.map((ques, index) =>

                        //console.log(quesk[index])
                        <div key={index}>
                            {ques.question_prompt}
                            <br></br>
                            A. {ques.option_A} B. {ques.option_B} C. {ques.option_C} D. {ques.option_D}
                            <button className='deletebutton' onClick={() => handleDelete(ques)}>Delete</button>
                        </div>
                    )
                }
            </div>
        </body>
    )
}

export default AddCESPage