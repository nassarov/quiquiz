let selectedId = localStorage.getItem("selectedQuiz");
const container = document.getElementById("container");
const form = document.getElementById("quiz-form");
const submit = document.getElementById("log-reg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
console.log(selectedId);
let quizzes = JSON.parse(localStorage.getItem("quizzes"));
let currentQuiz = quizzes.find((quiz) => quiz.id == selectedId);

let questionIndex = 0;

function displayQuestion() {
  submit.classList.add("hidden");
  let questionContent = currentQuiz.questions[questionIndex];
  let questionTitle = questionContent.question;
  console.log(questionTitle);
  let question = document.querySelector(".question");
  question.innerText = questionTitle;
  questionContent.options.forEach((option) => {
    let button = document.createElement("button");
    button.classList.add("option");
    button.innerText = option;
    button.addEventListener("click", () => {
      submit.classList.remove("hidden");
      selectedAnswer(button, option, questionContent.answer);
    });
    container.appendChild(button);
  });
}
function selectedAnswer(btn, selectedOption, correctAnswer) {
  console.log(btn, selectedOption, correctAnswer);
  let allOptions = document.querySelectorAll(".option");
  console.log(allOptions);
  allOptions.forEach((btn) => btn.classList.remove("selected"));
  btn.classList.add("selected");
  submit.disabled = false;
  submit.addEventListener("click", () => {
    checkAndSubmit(btn, selectedOption, correctAnswer, allOptions);
  });
}

function checkAndSubmit(btn, selectedOption, correctAnswer, allOptions) {
  console.log(btn, selectedOption, correctAnswer, "SUBMT");
  allOptions.forEach((btn) => (btn.disabled = true));
  submit.disabled = true;
}
