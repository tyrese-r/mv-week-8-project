const Questions = require("../Model/Questions.model");
const fetch = require("isomorphic-fetch");
const User = require("../Model/User.model");
const db = require("./db");

async function seed() {
  await db.sync({
    force: true,
  });

  const john = User.create({
    username: "John",
  });
  const pam = User.create({
    username: "Pam",
  });
  const eve = User.create({
    username: "Eve",
  });
  const mario = User.create({
    username: "Mario",
  });

  async function newUser(user) {
    await User.create({
      username: user,
    });
  }

  async function scoreUpdate(username, newScore) {
    const currentUser = await User.findByPk(username);
    console.log("SCORE: ", currentUser.highestScore);
    if (newScore > currentUser.highestScore) {
      currentUser.update({ highestScore: newScore });
    }
    console.log("SCORE UPDATE: ", currentUser.highestScore);
  }

  scoreUpdate("Mario", 2);

  const response = await fetch("https://opentdb.com/api.php?amount=50");
  const data = await response.json();
  results = data.results;

  results.map((item) => {
    item.incorrect_answer1 = item.incorrect_answers[0];
    item.incorrect_answer2 = item.incorrect_answers[1];
    item.incorrect_answer3 = item.incorrect_answers[2];
    delete item.incorrect_answers;
  });

  await Questions.bulkCreate(results);
}

seed();
