import { useState } from "react";
import "./App.css";
import { StartPage } from "./Components/StartPage";

function App() {
  const [questions, setQuestions] = useState();
  return (
    <div className="App">
      <StartPage setQuestions={setQuestions} />
    </div>
  );
}

export default App;
