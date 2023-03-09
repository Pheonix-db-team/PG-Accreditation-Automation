import React from 'react';
//import { auth } from '../config/firebase';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigate, useLocation } from "react-router-dom";

function FacultyDashboard() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [fac, setFac] = useState(state.fac);
    useEffect(() => {
        console.log("Dashboard state")
        console.log(state);
        const fetchDetails = async () => {

            //Read data
            try {
                //const curr = auth.currentUser;
                //const email = curr?.email;
                // console.log("Welcome " + email);

                const data = await getDoc(doc(db, "faculty", state.fac_email));
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

        };
        if (0) {
            // if (state.fac_email) {
            fetchDetails();
            console.log("Fac obj");
            console.log(fac);
        }
    }
        , []);
    if (state.fac_email) {
        return (
            <div className='div-margin'>Faculty Dashboard
                <br></br>
                Name :{fac['Name']}
                <br></br>
                Email :{fac['EmailID']}
                <br></br>
                Department :{fac['Department']}
                <br></br>
                Subjects
                <br></br>
                <div>
                    {
                        (state.fac['Courses_assigned']) ?
                            fac['Courses_assigned'].map((course) => <div key={course}>
                                {course}
                            </div>) : <div>"No subject assigned"</div>
                    }
                </div>
            </div>
        );
    }
    else {
        return <div>Account Authentication issue go to home</div>
    }
}

export default FacultyDashboard