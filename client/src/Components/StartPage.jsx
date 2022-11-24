import { useEffect, useState } from "react";
import styled from "styled-components";

export const StartPage = ({ setQuestions, setUsername }) => {
  const [categoryList, setCategoryList] = useState();
  const [currentCategory, setCurrentCategory] = useState(9);
  const [currentDifficulty, setCurrentDifficulty] = useState("easy");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://opentdb.com/api_category.php");
      const { trivia_categories } = await response.json();
      setCategoryList(trivia_categories);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleClick = async () => {
    const response = await fetch(
      `http://localhost:3001/questions?category=${currentCategory}&difficulty=${currentDifficulty}`
    );
    const { results } = await response.json();
    setQuestions(results);
  };

  return (
    !isLoading && (
      <Section>
        <Form>
          {/* <div> */}
          <label htmlFor="name">Name:</label>
          <Input name="name" onChange={(e) => setUsername(e.target.value)} />
          {/* </div> */}
          {/* <div> */}
          <label htmlFor="category">Category:</label>
          <Select
            value={currentCategory}
            onChange={(e) => setCurrentCategory(e.target.value)}
          >
            {categoryList.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </Select>
          {/* </div> */}
          {/* <div> */}
          <label htmlFor="difficulty">Difficulty:</label>
          <Select
            value={currentDifficulty}
            onChange={(e) => setCurrentDifficulty(e.target.value)}
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </Select>
          {/* </div> */}
        </Form>
        <Button onClick={handleClick}>Start Quiz</Button>
      </Section>
    )
  );
};

const Section = styled.section`
  min-width: 40vw;
  max-width: 60vw;
  margin-top: 10vw;
  height: 50%;
  background-color: lightblue;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: 10px 10px #647479;
`;

const Form = styled.form`
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Select = styled.select`
  width: 60%;
`;

const Input = styled.input`
  width: 60%;
`;

const Button = styled.button`
  width: 40%;
  height: 10%;
  border-radius: 10px;
  margin-bottom: 2vw;
`;
