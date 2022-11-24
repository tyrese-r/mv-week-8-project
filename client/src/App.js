import { useState } from "react";
import "./App.css";
import { StartPage } from "./Components/StartPage";
import { Header } from "./Components/Header";

function App() {
  const [questions, setQuestions] = useState();
  const [username, setUsername] = useState();
  console.log(questions);
  return (
    <div className="App">
      <Header />
      <StartPage setQuestions={setQuestions} setUsername={setUsername} />
    </div>
  );
}

export default App;
