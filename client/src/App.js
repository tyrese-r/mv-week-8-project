import { useState } from "react";
import "./App.css";
import { StartPage } from "./Components/StartPage";
import { Header } from "./Components/Header";

function App() {
  const [questions, setQuestions] = useState();
  return (
    <div className="App">
      <Header />
      <StartPage setQuestions={setQuestions} />
    </div>
  );
}

export default App;
