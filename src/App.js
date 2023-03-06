//import logo from './logo.svg';
import './App.css';
import HelloWorld from './components/HelloWorld';
function App() {
  const num = 46;
  return (
    <div className="App">
      //passing var w prop
      <HelloWorld num={num} />
    </div>
  );
}

export default App;
