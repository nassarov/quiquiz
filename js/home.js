const list = document.querySelector(".quiz-list");
const logout = document.querySelector(".logout");
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

logout.addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  window.location.replace("/quiquiz/index.html");
});
if (!loggedUser) {
  window.location.replace("/quiquiz/index.html");
}

let quizzes = [];
let results = [];
function getQuizzes() {
  fetch("http://localhost:8080/quiquiz/api/getQuizzes.php")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      quizzes = data.quizzes; //array sent byt php
      getScores();
    });
}
function getScores() {
  const userId = loggedUser;
  fetch(`http://localhost:8080/quiquiz/api/getScores.php?userId=${userId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      results = data.results;
      showQuizzes();
    });
}
// display quizzess
function showQuizzes() {
  quizzes.forEach((quiz) => {
    let quizScore = 0; // default score
    const result = results.find((res) => res.quiz_id == quiz.id);
    if (result) {
      quizScore = result.score;
    }
    // create the card
    createQuizCard(quiz.title, quizScore, quiz.id);
  });

  const startButtons = document.querySelectorAll(".start-button");
  startButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const quizId = button.dataset.quizId;
      const selectedQuiz = quizzes.find((q) => q.id == quizId);
      if (selectedQuiz) {
        localStorage.setItem("selectedQuiz", selectedQuiz.id);
        window.location.href = "/quiquiz/quiz.html";
      }
    });
  });
}

function createQuizCard(title, score, quizId) {
  const card = document.createElement("div");
  card.classList.add("quiz-card");
  card.innerHTML = `
    <h2>${title}</h2>
    <p class="score">Highest Score: <span class="score-value">${score}/3</span></p>
    <button class="start-button" data-quiz-id="${quizId}">Start Quiz</button>
  `;
  list.appendChild(card);
}

getQuizzes();
