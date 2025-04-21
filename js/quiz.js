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
