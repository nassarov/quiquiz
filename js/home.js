let quizzes = JSON.parse(localStorage.getItem("quizzes"));
const list = document.querySelector(".quiz-list");
let results = JSON.parse(localStorage.getItem("results")) || []; //get score from result if exist

console.log(quizzes[0].title);

function getQuizScore(id) {
  let quiz = results.find((res) => res.quizId == id);
  return quiz ? quiz.score : 0;
}
function createCard(title, score) {
  let card = document.createElement("div");
  card.classList.add("quiz-card");
  card.innerHTML = `
        <h2>${title}</h2>
        <p class="score">Your Score: <span class="score-value">${score}/3</span></p>
        <button class="start-button">Start Quiz</button>
      `;
  list.appendChild(card);
}
quizzes.forEach((quiz) => {
  let quizScore = getQuizScore(quiz.id);
  createCard(quiz.title, quizScore);
});
const startButtons = document.querySelectorAll(".start-button");
console.log(startButtons);
startButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    let quiz = quizzes[index];
    console.log(quiz);
    let selected = quiz.id;
    localStorage.setItem("selectedQuiz", selected);
    window.location.href = "../quiz.html";
  });
});
