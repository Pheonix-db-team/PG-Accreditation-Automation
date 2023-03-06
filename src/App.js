//import logo from './logo.svg';
import './App.css';
import HelloWorld from './components/HelloWorld';
function App() {
  const num = 46;
  const str = "xyz";
  return (
    <div className="App">
      //passing var w prop
      <HelloWorld propnum={num} propstr={str} />
    </div>
  );
}

export default App;
