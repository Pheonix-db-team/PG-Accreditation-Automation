import React from 'react'
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useState, useEffect } from 'react';
function ViewCESResponsesPage() {

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
                console.log("looping " + key, value);
                //const option = 
                dict_consolidate[key][value]++;
            }
        });
        console.log(dict_consolidate);


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
    CESconsolidate(CESResponsesArr)
    return (
        <div>viewCESResponses</div>
    )
}

export default ViewCESResponsesPage