import React from 'react'
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { getValueByKey } from '../App';
import { useNavigate, useLocation } from "react-router-dom";

function ViewCESResponsesPage() {
    let { state } = useLocation();
    const data = [];
    const options_chart = {

    }
    const survey = state.survey;
    const navigate = useNavigate();
    const CESResponsesArr = state.responsesArr;
    // const survey =

    // {
    //     "Question_List": [
    //         {
    //             "option_A": "Very Good",
    //             "option_D": "Bad",
    //             "option_B": "Good",
    //             "question_prompt": "How was course experience",
    //             "tag": 0,
    //             "option_C": "Average"
    //         },
    //         {
    //             "option_A": "Very Good",
    //             "option_D": "Bad",
    //             "option_B": "Good",
    //             "question_prompt": "How confident are you of course outcomes",
    //             "tag": 1,
    //             "option_C": "Average"
    //         },
    //         {
    //             "option_A": "Very Good",
    //             "option_D": "Bad",
    //             "option_B": "Good",
    //             "question_prompt": "How was theory and practical integration",
    //             "tag": 2,
    //             "option_C": "Average"
    //         }
    //     ],
    //     "Survey_ID": "DSMonsoon2023",
    //     "SubjectID": "DS",
    //     "Sem_ID": "Monsoon2023",
    //     "facultyEmail": "testmsd@gmail.com",
    //     "id": "DSMonsoon2023"
    // }


    // const CESResponsesArr = [
    //     {
    //         "Enrolment_No": "M220256CS",
    //         "Survey_ID": "DSMonsoon2023",
    //         "StudentEmail": "testy@gmail.com",
    //         "SubjectID": "DS",
    //         "Responses": {
    //             "0": "A",
    //             "1": "B",
    //             "2": "C",

    //         },
    //         "id": "DSMonsoon2023testy@gmail.com"
    //     },
    //     {
    //         "Enrolment_No": "M220255CS",
    //         "Survey_ID": "DSMonsoon2023",
    //         "StudentEmail": "testy1@gmail.com",
    //         "SubjectID": "DS",
    //         "Responses": {
    //             "0": "A",
    //             "1": "A",
    //             "2": "A",

    //         },
    //         "id": "DSMonsoon2023testy@gmail.com"
    //     },
    //     {
    //         "Enrolment_No": "M220255CS",
    //         "Survey_ID": "DSMonsoon2023",
    //         "StudentEmail": "testy1@gmail.com",
    //         "SubjectID": "DS",
    //         "Responses": {
    //             "0": "C",
    //             "1": "A",
    //             "2": "B",

    //         },
    //         "id": "DSMonsoon2023testy@gmail.com"
    //     },
    // ];
    function CESconsolidate(respArr) {

        const dict_consolidate = {};
        const resp_temp_prep = respArr[0]['Responses'];
        for (const [key, value] of Object.entries(resp_temp_prep)) {
            dict_consolidate[key] = {
                'A': 0,
                'B': 0,
                'C': 0,
                'D': 0,
            }
        }
        respArr.map((ele) => {
            const resp_ele = ele["Responses"];
            for (const [key, value] of Object.entries(resp_ele)) {
                dict_consolidate[key][value]++;
            }
        });

        var temp_label = [];
        var temp_response_count = [];
        var temp_title = "";
        var dict_temp_set = {};
        for (const [key_outer, value_outer] of Object.entries(dict_consolidate)) {
            temp_label = [];
            temp_response_count = [];

            for (const [key, value] of Object.entries(value_outer)) {
                const index = getValueByKey(survey['Question_List'], "tag", key_outer);
                temp_label.push(survey['Question_List'][index]['option_' + key]);
                temp_title = survey['Question_List'][index]['question_prompt'];
                temp_response_count.push(value);
            }
            dict_temp_set = {
                "labels": temp_label,
                "datasets": [
                    {
                        "label": temp_title,
                        data: temp_response_count,



                    }
                ]
            };


            data.push(dict_temp_set);
        }

    }
    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const data_1 = await getDocs(collection(db, "CESResponses"));

                const filtered_data_1 = data_1.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                console.log(filtered_data_1);
            }
            catch (err) {
                console.error(err);
                alert("⚠" + err.message);
            }

        };
        const fetchSurveys = async () => {


            try {
                const data_1 = await getDocs(collection(db, "survey"));
                const filtered_data_1 = data_1.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                console.log("Survey")
                console.log(filtered_data_1);
            }
            catch (err) {
                alert("⚠" + err.message);
                console.error(err);
            }

        };
        fetchSurveys();

    }
        , []);

    CESconsolidate(CESResponsesArr)
    Chart.register(...registerables)

    return (<div>
        <button className="styledbutton" onClick={() => navigate(-1)}>Back</button>
        {data.map((data_set, index) =>
            <div key={survey.Sem_ID} style={{ "height": 200 }}>
                <Bar data={data_set} options={options_chart} />
            </div>
        )
        }

    </div >);
}

export default ViewCESResponsesPage