import { useState } from "react";
import "./App.css";
import { StartPage } from "./Components/StartPage";
import { Header } from "./Components/Header";
import { Instructions } from "./Components/Instructions";
import styled from "styled-components";
import { Score } from "./Components/Score";
// import { Questions } from "./Components/Questions";
import { Routes, Route } from "react-router-dom";

function App() {
  const [questions, setQuestions] = useState();
  const [username, setUsername] = useState();

  console.log(questions);
  return (
    <div className="App">
      <Header />
      <Instructions />
      <Main>
        <Routes>
          <Route
            path="/"
            element={
              <StartPage
                setQuestions={setQuestions}
                setUsername={setUsername}
              />
            }
          />
          {/* <Route path="/start" element={<Questions questions={questions} />} /> */}
          <Route path="/score" element={<Score username={username} />} />
        </Routes>
      </Main>
    </div>
  );
}

export default App;

const Main = styled.main`
  font-family: "Poppins", sans-serif;
`;
