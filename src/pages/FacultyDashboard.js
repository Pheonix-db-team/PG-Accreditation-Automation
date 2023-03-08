import React from 'react';
import { auth } from '../config/firebase';
import { useState, useEffect } from 'react';
import { doc, getDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigate } from "react-router-dom";

function FacultyDashboard() {
    const navigate = useNavigate();
    const [fac, setFac] = useState({});
    useEffect(() => {
        const fetchDetails = async () => {

            //Read data
            try {
                const curr = auth.currentUser;
                //const email = curr?.email;
                // console.log("Welcome " + email);

                const data = await getDoc(doc(db, "faculty", "testmsd@gmail.com"));
                //const data = await getDoc(collection(db, "faculty", "testmsd@gmail.com"));

                const filtered_data = data.data();
                console.log("Fetched data");
                console.log(filtered_data);
                setFac(filtered_data);
                // return filtered_data;

            }
            catch (err) {
                console.error(err);
                //return "";
            }

        }; fetchDetails();
        console.log("Fac obj");
        console.log(fac);
    }
        , []);
    return (
        <div>Faculty Dashboard
            <br></br>
            Name :{fac['Name']}
            <br></br>
            Email :{fac['EmailID']}
            <br></br>
            Department :{fac['Department']}
            <br></br>

        </div>
    )
}

export default FacultyDashboard