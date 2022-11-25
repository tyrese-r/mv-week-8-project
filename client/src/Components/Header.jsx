import styled from "styled-components";

export const Header = () => {
  return (
    <Top>
      <h1>Trivia Quiz Game</h1>
    </Top>
  );
};

const Top = styled.header`
  height: 20vw;
  background-color: lightblue;
  padding-top: 2vw;
  padding-bottom: 2vw;
  margin-bottom: 2vw;
  font-size: xx-large;
  font-family: "Fugaz One", cursive;
`;
