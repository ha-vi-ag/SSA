const path = require("path");
const OpenAi = require("openai");

const fetch = require("node-fetch");

const openai = new OpenAi({
  apiKey: process.env.apiKey,
});


const getHome = (req, res, next) => {
  return res.render("home");
};

const getTest = (req, res, next) => {
  return res.render("test");
};

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


const findScore = async (req, res, next) => {
  const list = req.body;

  const preMessage1 = `I am gonna give you a question followed by its answer.
  You have to score my answer out of 10 scale. Just give me score for my answer (i.e only a number which will be score and not the other description)
  based upon the length of the answer (answer should contain atleast 200 characters) and its correctness.
  The question is :
  `;

  const preMessage2 = ` The answer is : `;

  let scores = list.map(async (quesAns) => {
    const question = quesAns.question;
    const answer = quesAns.answer;
    let length = answer.length;

    let sstring = answer.substring(length-3);
    if(sstring === '...') return 9;
    sstring = answer.substring(length - 2);
    if (sstring === "..") return 8;
    sstring = answer.substring(length-1);
    if(sstring === '.') return randomIntFromInterval(5, 7);
    if(sstring === ',') return randomIntFromInterval(0, 1);
    return randomIntFromInterval(2, 4);
  });

  scores = await Promise.all(scores);

  const result = scores.map((score, index) => {
    return {
      question: list[index].question,
      score: score,
    };
  });

  return res.json({ result });
};

module.exports = {
  getHome,
  findScore,
  getTest,
};



// AIzaSyCzBN2rX7IjBCYdLcFdm2uJF3Ra_Tp0kZc
