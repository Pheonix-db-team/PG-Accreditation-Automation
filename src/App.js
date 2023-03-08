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

export default App;
