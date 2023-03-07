import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { addDoc, getDocs, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';
async function refreshList() {
    try {
        const studentsCollectionRef = collection(db, "test_pilot");
        const data = await getDocs(studentsCollectionRef);

        const filtered_data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log(filtered_data);
        return filtered_data
        //setStudentList(filtered_data);
    }
    catch (err) {
        console.error(err);
    }

};


function DashboardPage() {
    let { state } = useLocation();
    console.log(state.user_email);
    const [name, setName] = useState("");
    const [enroll, setEnroll] = useState("");
    const [studentList, setStudentList] = useState([])

    const handleSubmit = async (event) => {
        //prevent redirect to oth. page
        event.preventDefault();
        //alert("My name is " + name);
        // spread syntax   commonly used to make shallow copies
        try {
            const studentsCollectionRef = collection(db, "test_pilot");
            // const docRef = await addDoc(studentsCollectionRef, {

            //     enrolment_number: enroll, name: name,

            // });
            const docRef = await setDoc(doc(db, "test_pilot", enroll), {
                enrolment_number: enroll, name: name,

            });

            console.log("Added " + enroll + " with name " + name);
            //setStudentList(currentStudents => [...currentStudents, name]);
            setName('');
            setEnroll('');
            const updated_list = await refreshList();
            console.log(updated_list);
            setStudentList(updated_list);
            console.log("DocRef ", docRef);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }
    // key is collection name
    useEffect(() => {
        const studentsCollectionRef = collection(db, "test_pilot");
        const getStudentList = async () => {

            //Read data
            try {
                //console.log();
                console.log("Auth of curr user " + auth.currentUser.email);
                const data = await getDocs(studentsCollectionRef);

                const filtered_data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                console.log(filtered_data);
                setStudentList(filtered_data);
            }
            catch (err) {
                console.error(err);
            }

        }; getStudentList();
    }
        , []);

    return (
        <div>DashboardPage
            <br></br>
            <br></br>
            <div>
                <form onSubmit={handleSubmit
                }>
                    <div > Add new Student</div>
                    <div>Name</div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                    <div>Enrollment</div>
                    <input type="text" value={enroll} onChange={(e) => setEnroll(e.target.value)}></input>
                    <input type="submit"></input>
                </form>
            </div>
            <br></br>
            <div>
                {
                    studentList.map((student) => <div key={student.id}>
                        <h6>{student.name} {student.enrolment_number}</h6>
                    </div>)
                }
            </div>
        </div>
    )
}

export default DashboardPage
