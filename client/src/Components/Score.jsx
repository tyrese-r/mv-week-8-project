import { useEffect, useState } from "react";

export const Score = ({ username }) => {
  //   console.log(username);

  const [userScore, setUserScore] = useState();
  const [users, setUsers] = useState(false);

  let score = 1;

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(`http://localhost:3001/users`);
      const data = await response.json();
      //   console.log(data);
      setUsers(data);
    }
    fetchUsers();
    if (username) {
      if (users.some((e) => e.username === username)) {
        async function fetchData() {
          const response = await fetch(
            `http://localhost:3001/users/${username}`
          );
          const data = await response.json();
          //   console.log(data);
          setUserScore(data.highestScore);
        }
        fetchData();
      } else {
        async function createUser() {
          const response = await fetch(`http://localhost:3001/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username }),
          });

          //   console.log(response);
          setUserScore(0);
        }
        createUser();
      }
    }
  }, [username]);

  //   console.log(userScore);

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
