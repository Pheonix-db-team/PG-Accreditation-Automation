//import logo from './logo.svg';
import './App.css';
import HelloWorld from './components/HelloWorld';
import NavBar from './components/NavBar';
import './App.css';
import Greeting from './components/Greeting';
function App() {
  const num = 46;
  const str = "xyz";
  return (
    <div className="App">
      <NavBar></NavBar>
      //passing var w prop
      <HelloWorld propnum={num} propstr={str} />
      <Greeting></Greeting>
    </div>
  );
}

export default App;
