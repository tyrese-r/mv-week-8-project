import { useState } from "react";

export const StartPage = ({ setQuestions }) => {
  const [currentCategory, setCurrentCategory] = useState("General Knowledge");
  const [currentDifficulty, setCurrentDifficulty] = useState("easy");

  const handleClick = async () => {
    const response = await fetch(
      `localhost:5001?category=${currentCategory}&difficulty=${currentDifficulty}`
    );
    const data = await response.json();
    setQuestions(data);
  };

  return (
    <form>
      <div>
        <label htmlFor="name">Name:</label>
        <input name="name" />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <select
          value={currentCategory}
          onChange={(e) => setCurrentCategory(e.target.value)}
        >
          {/* {categories.map((category) => {
            <option value="category">{category}</option>;
          })} */}
          <option value="general knowledge">General knowledge</option>
        </select>
      </div>
      <div>
        <label htmlFor="difficulty">Difficulty:</label>
        <select
          value={currentDifficulty}
          onChange={(e) => setCurrentDifficulty(e.target.value)}
        >
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
      </div>
      <button onClick={handleClick}>Start Quiz</button>
    </form>
  );
};
