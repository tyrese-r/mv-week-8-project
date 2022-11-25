import { useEffect, useState } from "react";
import styled from "styled-components";

export const StartPage = ({ setQuestions, setUsername }) => {
  const [categoryList, setCategoryList] = useState();
  const [currentCategory, setCurrentCategory] = useState("General Knowledge");
  const [currentDifficulty, setCurrentDifficulty] = useState("easy");
  const [isLoading, setIsLoading] = useState(true);

  // fetch all the categories from the API
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://opentdb.com/api_category.php");
      const { trivia_categories } = await response.json();
      setCategoryList(trivia_categories);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  // on click of 'Start quiz' button
  const handleClick = async () => {
    // GET request to fetch all question which match category and difficulty selected
    const response = await fetch(
      `http://localhost:3001/questions?category=${currentCategory.replace(
        "&",
        "%26"
      )}&difficulty=${currentDifficulty}`
    );
    const { question } = await response.json();
    // set the questions in state
    setQuestions(question);
  };

  return (
    // only return page when isLoading becomes false in uesEffect
    !isLoading && (
      <Section>
        <Form>
          <label htmlFor="name">Name:</label>
          {/* input sets username in state */}
          <Input name="name" onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="category">Category:</label>
          <Select
            value={currentCategory}
            // onChange - selected category is set in state
            onChange={(e) => setCurrentCategory(e.target.value)}
          >
            {/* map through list of categories to dynamically create options list */}
            {categoryList.map((category) => {
              return (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </Select>
          <label htmlFor="difficulty">Difficulty:</label>
          <Select
            value={currentDifficulty}
            // onChange - selected difficulty is set in state
            onChange={(e) => setCurrentDifficulty(e.target.value)}
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </Select>
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
