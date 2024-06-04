const questionList = document.getElementById("questionList");
const form = document.getElementById("form");

function fetchTextfieldValue(node) {
  node = node.firstChild;
  let cur = {};
  while (node) {
    if (node.tagName === "TEXTAREA") {
      cur.answer = node.value;
    } else if (node.tagName === 'INPUT') {
      cur.question = node.value;
    }
    node = node.nextSibling;
  }
  return cur;
}

function createAnwerTag(details, quesNo) {
  const div = document.createElement("div");
  div.setAttribute("class", "form-group question-item");

  const label1 = document.createElement("label");
  label1.innerText = "Question " + quesNo + ":";
  
  const input = document.createElement("input");
  input.setAttribute("readOnly", "readOnly");
  input.setAttribute("class", "form-control");
  input.value = details.question;

  div.appendChild(label1);
  div.appendChild(input);

  const input1 = document.createElement("input");
  input1.setAttribute("readOnly", "readOnly");
  input1.setAttribute("class", "form-control");
  input1.value = details.score;

  const label2 = document.createElement("label");
  label2.innerText = "Score: ";
  div.appendChild(label2);
  div.appendChild(input1);
  
  return div;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const list = [];
  let child = questionList.firstChild;
  let cur = {};

  while (child) {
    if (child.nodeType === Node.TEXT_NODE) {
      child = child.nextSibling;
      continue;
    }
    list.push(fetchTextfieldValue(child));
    child = child.nextSibling;
  }

  fetch("http://localhost:4000/score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  })
    .then((response) => response.json())
    .then((response) => {
      form.innerHTML = "";
      document.getElementById("heading").innerText = "Score Card";
      return response.result.forEach((detail, index) => {
        const div = createAnwerTag(detail, index + 1);
        form.appendChild(div);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
