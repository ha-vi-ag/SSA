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

    let response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: preMessage1 + question + preMessage2 + answer,
        },
      ],
      max_tokens: 100,
    });
    return response.choices[0].message.content;

    
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
