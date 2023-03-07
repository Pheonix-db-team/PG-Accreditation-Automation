import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

function DashboardPage() {
    let { state } = useLocation();
    console.log(state.user_email);
    const [studentList, setStudentList] = useState([])
    const studentsCollectionRef = collection(db, "test_pilot");
    // key is collection name
    useEffect(() => {
        const getStudentList = async () => {

            //Read data

            const getStudentList = async () => {

            }
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
                const data = await getDocs(studentsCollectionRef);
                console.log(data);
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
            <div>{state.user_email}</div>
        </div>
    )
}

export default DashboardPage
