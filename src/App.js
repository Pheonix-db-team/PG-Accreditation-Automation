//import logo from './logo.svg';
import './App.css';
import HelloWorld from './components/HelloWorld';
import NavBar from './components/NavBar';
import './App.css';
import Greeting from './components/Greeting';
import { useState } from 'react';
function App() {
  //  const num = 46;
  //const str = "xyz";
  const students = ['A', 'B', 'C', 'D'];
  const listItems = students.map(person => <li>{person}</li>);
  const [name, setName] = useState("");
  const handleSubmit = (event) => {
    //prevent redirect to oth. page
    event.preventDefault();
    alert("My name is " + name);

  }
  //array

  return (
    <div className="App">
      <NavBar></NavBar>
      <br></br>
      <form onSubmit={handleSubmit
      }>
        <div >{name}</div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
        <input type="submit"></input>
      </form>
      Student List
      <ul>{listItems}</ul>
    </div>
  );
}

export default App;
