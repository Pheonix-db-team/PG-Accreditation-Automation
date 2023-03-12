import React from 'react'
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { getValueByKey } from '../App';

function ViewCESResponsesPage() {
    //const [data, setData] = useState({});
    const data = [];
    const options_chart = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    stepSize: 1,
                }
            }]
        }
    }
    const survey =

    {
        "Question_List": [
            {
                "option_A": "Very Good",
                "option_D": "Bad",
                "option_B": "Good",
                "question_prompt": "How was course experience",
                "tag": 0,
                "option_C": "Average"
            },
            {
                "option_A": "Very Good",
                "option_D": "Bad",
                "option_B": "Good",
                "question_prompt": "How confident are you of course outcomes",
                "tag": 1,
                "option_C": "Average"
            },
            {
                "option_A": "Very Good",
                "option_D": "Bad",
                "option_B": "Good",
                "question_prompt": "How was theory and practical integration",
                "tag": 2,
                "option_C": "Average"
            }
        ],
        "Survey_ID": "DSMonsoon2023",
        "SubjectID": "DS",
        "Sem_ID": "Monsoon2023",
        "facultyEmail": "testmsd@gmail.com",
        "id": "DSMonsoon2023"
    }


    const CESResponsesArr = [
        {
            "Enrolment_No": "M220256CS",
            "Survey_ID": "DSMonsoon2023",
            "StudentEmail": "testy@gmail.com",
            "SubjectID": "DS",
            "Responses": {
                "0": "A",
                "1": "B",
                "2": "C",

            },
            "id": "DSMonsoon2023testy@gmail.com"
        },
        {
            "Enrolment_No": "M220255CS",
            "Survey_ID": "DSMonsoon2023",
            "StudentEmail": "testy1@gmail.com",
            "SubjectID": "DS",
            "Responses": {
                "0": "A",
                "1": "A",
                "2": "A",

            },
            "id": "DSMonsoon2023testy@gmail.com"
        },
        {
            "Enrolment_No": "M220255CS",
            "Survey_ID": "DSMonsoon2023",
            "StudentEmail": "testy1@gmail.com",
            "SubjectID": "DS",
            "Responses": {
                "0": "C",
                "1": "A",
                "2": "B",

            },
            "id": "DSMonsoon2023testy@gmail.com"
        },
    ];
    function CESconsolidate(respArr) {
        const dict_consolidate = {};
        //dict prep initialize
        const resp_temp_prep = respArr[0]['Responses'];
        //console.log("Dict Prep")
        for (const [key, value] of Object.entries(resp_temp_prep)) {
            //   console.log("looping " + key, value);
            dict_consolidate[key] = {
                'A': 0,
                'B': 0,
                'C': 0,
                'D': 0,
            }
        }
        //response consolidate
        respArr.map((ele) => {
            const resp_ele = ele["Responses"];
            //console.log("outer loop " + resp_ele['id']);
            for (const [key, value] of Object.entries(resp_ele)) {
                //  console.log("looping " + key, value);
                //const option = 
                dict_consolidate[key][value]++;
            }
        });
        //  console.log("consolidated dict")
        //  console.log(dict_consolidate);
        var temp_label = [];
        var temp_response_count = [];
        var temp_title = "";
        var dict_temp_set = {};
        // for one dict
        //  var key_outer = 0;
        for (const [key_outer, value_outer] of Object.entries(dict_consolidate)) {
            temp_label = [];
            temp_response_count = [];

            for (const [key, value] of Object.entries(value_outer)) {
                //  console.log("looping " + key, value);
                //const option = 
                //   dict_consolidate[key][value]++;
                //  console.log("Key ! " + key)
                const index = getValueByKey(survey['Question_List'], "tag", key_outer);
                //  console.log("Index ! " + index)
                //  console.log(survey['Question_List'][index]);
                temp_label.push(survey['Question_List'][index]['option_' + key]);
                temp_title = survey['Question_List'][index]['question_prompt'];
                temp_response_count.push(value);
                //console.log("Loop " + key + " " + value)
            }
            dict_temp_set = {
                "labels": temp_label,
                "datasets": [
                    {
                        "label": temp_title,
                        data: temp_response_count,
                        //fill: true,
                        // backgroundColor: "rgba(6, 156,51, .3)",
                        // borderColor: "#02b844",
                    }
                ]
            };
            console.log("Dict ");
            console.log(dict_temp_set);
            data.push(dict_temp_set);
        }

    }
    useEffect(() => {
        const fetchResponses = async () => {

            //Read data
            try {
                const data_1 = await getDocs(collection(db, "CESResponses"));

                const filtered_data_1 = data_1.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                console.log(filtered_data_1);

            }
            catch (err) {
                console.error(err);
            }

        };
        const fetchSurveys = async () => {

            //Read data
            try {
                const data_1 = await getDocs(collection(db, "survey"));

                const filtered_data_1 = data_1.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                console.log("Survey")
                console.log(filtered_data_1);

            }
            catch (err) {
                console.error(err);
            }

        };
        fetchSurveys();

    }
        , []);

    // const data = {
    //     labels: ["Sunday", "Monday", "Tuesday",
    //         "Wednesday", "Thursday", "Friday", "Saturday"],
    //     datasets: [
    //         {
    //             label: "Hours Studied in Geeksforgeeks",
    //             data: [2, 5, 7, 9, 7, 6, 4],
    //             //fill: true,
    //             // backgroundColor: "rgba(6, 156,51, .3)",
    //             // borderColor: "#02b844",
    //         }
    //     ]
    // };
    //Line.register(CategoryScale);
    CESconsolidate(CESResponsesArr)
    Chart.register(...registerables)

    return (<div>
        {data.map((data_set, index) =>
            <div style={{ "height": 200 }}>
                <Bar data={data_set} options={options_chart} />
            </div>
        )
        }

    </div >);
}

export default ViewCESResponsesPage