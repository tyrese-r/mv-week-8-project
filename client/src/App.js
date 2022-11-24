import { useState } from "react";
import "./App.css";
import { StartPage } from "./Components/StartPage";
import { Header } from "./Components/Header";
import { Instructions } from "./Components/Instructions";
import styled from "styled-components";

function App() {
  const [questions, setQuestions] = useState();
  const [username, setUsername] = useState();
  console.log(questions);
  return (
    <div className="App">
      <Header />
      <Main>
        <Instructions />
        <StartPage setQuestions={setQuestions} setUsername={setUsername} />
      </Main>
    </div>
  );
}

export default App;

const Main = styled.main`
  font-family: "Poppins", sans-serif;
`;
