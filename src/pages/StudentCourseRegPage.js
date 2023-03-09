import React from 'react';
import { subject_test_array } from "../App.js";
import { useState, useEffect } from 'react';

function StudentCourseRegPage() {

    const getFormattedSubjectID = (SubjectID) => SubjectID;
    const [checkedState, setCheckedState] = useState(
        new Array(subject_test_array.length).fill(false)
        // fill array size w false
    );
    const [total, setTotal] = useState(0);
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item);
        setCheckedState(updatedCheckedState);
        const totalSubjectID = updatedCheckedState.reduce((sum, currentState, index) => { if (currentState === true) { return sum + subject_test_array[index].SubjectID; } return sum; }, 0);
        setTotal(totalSubjectID);
    };

    return (
        <div>Student Course Reg Page
            <br></br>
            <ul >
                {subject_test_array.map(({ SubjectName, SubjectID }, index) => {
                    return (
                        <li key={index}>
                            <div>
                                <div >
                                    <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={SubjectName}
                                        value={SubjectName}
                                        checked={checkedState[index]}
                                        onChange={() => handleOnChange(index)}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>{SubjectName}</label>
                                </div>
                                <div >{getFormattedSubjectID(SubjectID)}</div>
                            </div>
                        </li>
                    );
                })}
                <li>
                    <div >
                        <div >Total:</div>
                        <div >{getFormattedSubjectID(total)}</div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default StudentCourseRegPage