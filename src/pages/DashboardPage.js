import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';

function DashboardPage() {
    let { state } = useLocation();
    console.log(state.user_email);
    const [studentList, setStudentList] = useState([])

    // key is collection name
    useEffect(() => {
        const studentsCollectionRef = collection(db, "test_pilot");
        const getStudentList = async () => {

            //Read data


            // const  querySnapshot = await getDocs(
            //     studentsCollectionRef
            // );
            // //better readabiloty
            // querySnapshot.forEach((doc) => {
            //     console.log(`${doc.id} => ${doc.data()}`);
            //   });
            //set state to that data	
            //const data= await getDocs()

            try {
                console.log(auth.currentUser.email);
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
            <div> Logged in {state.user_email}</div>
            <br></br>
            <div>
                {
                    studentList.map((student) => <div key={student.id}>
                        <h4>{student.name}</h4>
                        <h6>{student.enrolment_number}</h6>
                    </div>)
                }
            </div>
        </div>
    )
}

export default DashboardPage
