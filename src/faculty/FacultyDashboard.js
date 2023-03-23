import React from 'react';
import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigate, useLocation } from "react-router-dom";
import AuthIssueComponent from '../components/AuthIssueComponent';
import Card from 'react-bootstrap/Card';
import '../App.css';
import img1 from '../image/NiTC1.png';
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
        <Card className='sitecard'>
            <div>
                <center> <img className='showlogo' src={img1} width="85%" alt="Logo" /></center>
            </div>
            <body>
                <div className='contentalign'><h2><b>Faculty Dashboard</b></h2>
                    <br></br>
                    <b>Name</b> :{fac['Name']}
                    <br></br>
                    {/* <br></br> */}
                    <b>Email</b>  :{fac['EmailID']}
                    <br></br>
                    <b>Department</b> :{fac['Department']}
                    <br></br>

                    {/* <br></br> */}
                    <div>
                        <b>Subjects:</b>
                        {

                            (state.fac['Courses_assigned'].length > 0) ?
                                fac['Courses_assigned'].map((course) => <div key={course}>
                                    {course}
                                </div>) : "No subject assigned"
                        }

                    </div>
                    <br></br>

                    <button className='styledbutton' onClick={() => addCESPageNavigation()}>Add CES</button>
                    <button className='styledbutton' onClick={() => navigate(-1)}>Logout</button>
                </div>
            </body>
        </Card>
    );


}

export default FacultyDashboard