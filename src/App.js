//import logo from './logo.svg';
import { Link } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import './App.css';
//import Greeting from './components/Greeting';
import { useState } from 'react';
function App() {
  //  const num = 46;
  //const str = "xyz";
  //const students = ['A', 'B', 'C', 'D'];
  const [name, setName] = useState("");
  const [students, setStudents] = useState(['A', 'B', 'C', 'D']);

  const handleSubmit = (event) => {
    //prevent redirect to oth. page
    event.preventDefault();
    //alert("My name is " + name);
    // spread syntax   commonly used to make shallow copies
    setStudents(currentStudents => [...currentStudents, name]);
    setName('');
  }
  const handleDelete = (deleting_student) => {
    const newStudents = students.filter((student) => student !== deleting_student);
    //prevent redirect to oth. page
    setStudents(newStudents)
    alert(deleting_student + " Deleted!");
  }
  const listItems = students.map(student => <li style={{
    margin: 3
  }}  > {student} < button className='deletebutton' onClick={() => handleDelete(student)}> Delete</button ></li >);


  return (
    <div className="App">
      <NavBar></NavBar>
      <br></br>

      <Link to="/signup" ><button className='styledbutton'>SignUp</button></Link>
      <br></br>
      <br></br>
      <Link to="/login" ><button className='styledbutton'>Login</button></Link>
      <form onSubmit={handleSubmit
      }>
        <div > Add new Student</div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
        <input type="submit"></input>
      </form>
      Student List
      <li>{listItems}</li>
    </div>
  );
}
export function getValueByKey(data, key, value_to_look,) {
  var i, len = data.length;
  //console.log("looking for value  " + value_to_look + " in key " + key)
  for (i = 0; i < len; i++) {
    if (data[i] && data[i][key] == value_to_look) {
      return i;
    }
  }

  return -1;
};
export default App;
export const password_from_prop = "test123";
export const email_from_prop = "test1@gmail.com";
export const student_test_email = "testy@gmail.com";
export const faculty_test_email = "testmsd@gmail.com";
export const departments = [
  { label: "COMPUTER SCIENCE AND ENGINEERING", value: "COMPUTER SCIENCE AND ENGINEERING" },
  { label: "ELECTRICAL ENGINEERING", value: "ELECTRICAL ENGINEERING" },
  { label: "MECHANICAL ENGINEERING", value: "MECHANICAL ENGINEERING" }
]
export const student_test = {
  "Name": "Yugam Parashar",
  "EmailID": "testy@gmail.com",
  "Enrolment_No": "M220256CS",
  "Courses_Registered": [],
  "Department": "COMPUTER SCIENCE AND ENGINEERING"
};
export const student_test_arr = [{
  "Name": "Yugam Parashar",
  "EmailID": "testy@gmail.com",
  "Enrolment_No": "M220256CS",
  "Courses_Registered": [],
  "Department": "COMPUTER SCIENCE AND ENGINEERING"
}, {
  "Name": "Yugam Parashar2",
  "EmailID": "2testy@gmail.com",
  "Enrolment_No": "2M220256CS",
  "Courses_Registered": [],
  "Department": "COMPUTER SCIENCE AND ENGINEERING"
},];
export const faculties_arr_test = [{
  "Courses_assigned": [], "Name": "Vinod Patheri",
  "EmailID": "pathari@nitc.ac.in", "FacultyID": "VPatheri",
  "Department": "Computer Science", "id": "pathari@nitc.ac.in"
},
{
  "Courses_assigned": ['DS'], "Name": "Madhu SD", "Department": "ELECTRICAL ENGINEERING",
  "EmailID": "testmsd@gmail.com", "FacultyID": "MSD", "id": "testmsd@gmail.com"
},
{
  "FacultyID": "NZR", "Courses_assigned": [], "Department": "COMPUTER SCIENCE AND ENGINEERING",
  "Name": "Nazir", "EmailID": "testnzr@gmail.com", "id": "testnzr@gmail.com"
},
{
  "Courses_assigned": [], "Department": "COMPUTER SCIENCE AND ENGINEERING",
  "EmailID": "testppn@gmail.com", "Name": "pournami PN", "FacultyID": "ppn",
  "id": "testppn@gmail.com"
}];
export const subject_test_array = [{
  "SubjectID": "CS101", "Students_Enrolled": [],
  "Name": "Artificial Intelligence", "Faculty_Assigned": "testppn@gmail.com",
  "Question_List": [], "CourseExitSurveyAvailable": false, "Department": "",
  "last_date": null, "id": "CS101",
},
{
  "Faculty_Assigned": "testppn@gmail.com", "SubjectID": "saAx",
  "Name": "s", "Question_List": null,
  "CourseExitSurveyAvailable": false, "Students_Enrolled": [],
  "Department": "COMPUTER SCIENCE AND ENGINEERING", "last_date": null,
  "id": "saAx"
}]
