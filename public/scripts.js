document.addEventListener("DOMContentLoaded", (event) => {
  let questionCount = 1;

  document.getElementById("addQuestion").addEventListener("click", () => {
    questionCount++;
    const questionsContainer = document.getElementById("questionList");

    const newQuestionItem = document.createElement("div");
    newQuestionItem.classList.add("form-group", "question-item");

    const questionLabel = document.createElement("label");
    questionLabel.setAttribute("for", `question${questionCount}`);
    questionLabel.textContent = `Question ${questionCount}:`;

    const questionInput = document.createElement("input");
    questionInput.type = "text";
    questionInput.classList.add("form-control");
    questionInput.id = `question${questionCount}`;
    questionInput.placeholder = "Enter your question";

    const answerLabel = document.createElement("label");
    answerLabel.setAttribute("for", `answer${questionCount}`);
    answerLabel.classList.add("mt-2");
    answerLabel.textContent = "Answer:";

    const answerTextarea = document.createElement("textarea");
    answerTextarea.classList.add("form-control");
    answerTextarea.id = `answer${questionCount}`;
    answerTextarea.rows = 3;
    answerTextarea.placeholder = "Write your answer here...";

    newQuestionItem.appendChild(questionLabel);
    newQuestionItem.appendChild(questionInput);
    newQuestionItem.appendChild(answerLabel);
    newQuestionItem.appendChild(answerTextarea);

    questionsContainer.appendChild(newQuestionItem);
  });
});
