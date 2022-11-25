import { useEffect, useState } from "react";

export const Score = ({ username }) => {
  const [userScore, setUserScore] = useState();
  const [users, setUsers] = useState(false);
  const [newScore, setNewScore] = useState();

  let score = 1;

  useEffect(() => {
    // fetch all users from the database
    async function fetchUsers() {
      const response = await fetch(`http://localhost:3001/users`);
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
    // if a username has been input
    if (username) {
      // check to see if the user exists in the database
      if (users.some((e) => e.username === username)) {
        // if the user exists - fetch their data to check their current high score
        async function fetchData() {
          const response = await fetch(
            `http://localhost:3001/users/${username}`
          );
          const data = await response.json();
          // set the userScore state with the users current high score
          setUserScore(data.highestScore);
          // if the new score if higher than the users existing score, send a PUT request to update their high score
          if (newScore > userScore) {
            async function updateScore() {
              await fetch(`http://localhost:3001/users/${username}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ highestScore: newScore }),
              });
            }
            updateScore();
          }
        }
        // if the user doesn't exist - send a POST request to create a new user
      } else {
        async function createUser() {
          const response = await fetch(`http://localhost:3001/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username }),
          });
          // set the users current high score to 0 - the default score in the db
          setUserScore(0);
        }
        createUser();
      }
    }
  }, [username]);

  // if the user's current score is higher than their new score return 'you did not beat your score' message, otherwise return a message telling them what their new high score is
  return userScore > score ? (
    <div>
      <h2>You did not beat your high score. Try again!</h2>
    </div>
  ) : (
    <div>
      <h2>
        Congratulations! <br />
        Your new high score is 🌟 {score} 🌟
      </h2>
      <button>Save Score</button>
    </div>
  );
};
