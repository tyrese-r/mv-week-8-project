const fetch = require("isomorphic-fetch");

const questionData = async function () {
  const response = await fetch("https://opentdb.com/api.php?amount=50");
  const data = await response.json();
  results = data.results;
  console.log(results);
};

questionData();
