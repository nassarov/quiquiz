let quizzes = JSON.parse(localStorage.getItem("quizzes"));
const list = document.querySelector(".quiz-list");
let results = JSON.parse(localStorage.getItem("results")) || []; // get existing results
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
const logout = document.querySelector(".logout");
// logout
logout.addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  window.location.replace("../index.html");
});
if (!loggedUser) {
  window.location.replace("../index.html");
}
const email = JSON.parse(localStorage.getItem("loggedUser")).email; // get user email

console.log(email);
console.log(results);
console.log(quizzes[0].title);

function getQuizScore(id, userEmail) {
  let quiz = results.find((res) => res.quizId == id && res.user === userEmail);
  return quiz ? quiz.score : 0;
}

function createCard(title, score, quizId, userEmail) {
  let card = document.createElement("div");
  card.classList.add("quiz-card");
  card.innerHTML = `
        <h2>${title}</h2>
        <p class="score">Your Score: <span class="score-value">${score}/3</span></p>
        <button class="start-button">Start Quiz</button>
      `;
  list.appendChild(card);
  //  if quiz result already exists for the loggeduser
  let exists = results.find(
    (res) => res.quizId == quizId && res.user === userEmail
  );
  if (!exists) {
    let newResult = {
      user: userEmail,
      quizId: quizId,
      score: 0,
    };
    results.push(newResult);
    localStorage.setItem("results", JSON.stringify(results));
  }
}

quizzes.forEach((quiz) => {
  let quizScore = getQuizScore(quiz.id, email);
  createCard(quiz.title, quizScore, quiz.id, email);
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
