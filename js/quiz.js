let selectedId = localStorage.getItem("selectedQuiz");
const container = document.getElementById("container");
const form = document.getElementById("quiz-form");
const submit = document.getElementById("log-reg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
