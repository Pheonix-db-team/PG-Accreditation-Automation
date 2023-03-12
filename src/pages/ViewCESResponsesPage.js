import React from 'react'
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

function ViewCESResponsesPage() {
    //const [data, setData] = useState({});
    var data = {};
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
        respArr.map((ele) => {
            const resp_ele = ele["Responses"];
            //console.log("outer loop " + resp_ele['id']);
            for (const [key, value] of Object.entries(resp_ele)) {
                //  console.log("looping " + key, value);
                //const option = 
                dict_consolidate[key][value]++;
            }
        });
        console.log(dict_consolidate);
        const temp_label = [];
        const temp_response_count = [];
        // for one dict

        for (const [key, value] of Object.entries(dict_consolidate[0])) {
            //  console.log("looping " + key, value);
            //const option = 
            //   dict_consolidate[key][value]++;
            temp_label.push(key);
            temp_response_count.push(value);
            console.log("Loop " + key + " " + value)
        }
        const dict_temp_set = {
            "labels": temp_label,
            "datasets": [
                {
                    "label": "CES responses",
                    data: temp_response_count,
                    //fill: true,
                    // backgroundColor: "rgba(6, 156,51, .3)",
                    // borderColor: "#02b844",
                }
            ]
        };

        data = dict_temp_set
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

        }; //fetchResponses();

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

        <Bar data={data} />
    </div>);
}

export default ViewCESResponsesPage