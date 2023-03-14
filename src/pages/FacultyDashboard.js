import React from 'react';
import { useState, useEffect } from 'react';
import { getDocs, collection, setDoc, getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigate, useLocation } from "react-router-dom";
import AuthIssueComponent from '../components/AuthIssueComponent';
function FacultyDashboard() {
    const navigate = useNavigate();
    const { state } = useLocation();
    function addCESPageNavigation() {
        console.log("CES Button tapped Calling navigation ")
        navigate('/addces', { state: { fac: state.fac } });

    }
    const [fac, setFac] = useState(state ? state.fac : {});

    useEffect(() => {
        console.log("Dashboard state")
        console.log(state);
        const fetchDetails = async () => {
            try {
                const data = await getDoc(doc(db, "faculty", state.fac_email));
                const filtered_data = data.data();
                console.log("Fetched data");
                console.log(filtered_data);
                setFac(filtered_data);
            }
            catch (error) {
                console.error(error);
                console.log(error.code)
                alert("⚠" + error.message);
            }
        };
    }
        , []);
    if (!state) {
        return AuthIssueComponent();
    }
    return (
        <body>
            <div className='div-margin'>Faculty Dashboard
                <br></br>
                <button className='styledbutton' onClick={() => navigate(-1)}>Logout</button>
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
                <button className='styledbutton' onClick={() => addCESPageNavigation()}>Add CES</button>

            </div>
        </body>
    );


}

export default FacultyDashboard