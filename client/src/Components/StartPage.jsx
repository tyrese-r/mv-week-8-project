import { useEffect, useState } from "react";

export const StartPage = ({ setQuestions }) => {
  const [categoryList, setCategoryList] = useState();
  const [currentCategory, setCurrentCategory] = useState("General Knowledge");
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
      <>
        <form>
          {/* <div>
        <label htmlFor="name">Name:</label>
        <input name="name" />
    </div> */}
          <div>
            <label htmlFor="category">Category:</label>
            <select
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
        </form>
        <button onClick={handleClick}>Start Quiz</button>
      </>
    )
  );
};
