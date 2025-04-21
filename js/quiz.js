let selectedId = localStorage.getItem("selectedQuiz");
const container = document.getElementById("container");
const form = document.getElementById("quiz-form");
const submitButton = document.getElementById("log-reg");
const questionElement = document.querySelector(".question");
const timerElement = document.getElementById("timer");
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
if (!loggedUser) {
  window.location.replace("../login.html");
}
let email = JSON.parse(localStorage.getItem("loggedUser")).email;

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
console.log(selectedId);
let quizzes = JSON.parse(localStorage.getItem("quizzes"));
let currentQuiz = quizzes.find((quiz) => quiz.id == selectedId);

let questionIndex = 0;
let selectedOption = null;
let correctAnswer = null;
let allOptionsButtons = [];
let timerInterval;
let seconds = 9;
let submitted = false;

let score = 0;

function startTimer() {
  clearInterval(timerInterval); // stop prev timer
  seconds = 9; //reset back to 9
  updateTimer();
  timerInterval = setInterval(() => {
    seconds--;
    updateTimer();
    if (seconds == 0) {
      clearInterval(timerInterval);
      checkAndSubmit();
    }
  }, 1000);
}
function updateTimer() {
  const time = `00:0${seconds}`;
  timerElement.textContent = time;
}

function displayQuestion() {
  container.innerHTML = ""; //clear old form
  submitButton.disabled = true;
  selectedOption = null;
  submitted = false; // reset

  if (questionIndex < currentQuiz.questions.length) {
    const questionContent = currentQuiz.questions[questionIndex];
    console.log(questionContent);
    questionElement.innerText = questionContent.question;
    correctAnswer = questionContent.answer;
    allOptionsButtons = []; //suggested by ai to achieve good result
    questionContent.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.classList.add("option");
      button.innerText = option;
      button.dataset.answer = option; //use dataset for each button
      button.addEventListener("click", () => {
        handleOptionSelect(button, option);
      });
      container.appendChild(button);
      allOptionsButtons.push(button);
      console.log(allOptionsButtons);
    });
    startTimer();
  } else {
    questionElement.innerText = "Quiz Finished!";
    container.innerHTML = "";
    submitButton.style.display = "none";
    clearInterval(timerInterval);
    console.log(`${score}/3`);
    let existingResults = JSON.parse(localStorage.getItem("results")) || [];
    let index = existingResults.findIndex(
      (res) => res.quizId == selectedId && res.user == email
    );

    if (index !== -1) {
      existingResults[index].score = score; // update if exists
    } else {
      existingResults.push({
        user: email,
        quizId: selectedId,
        score: score,
      });
    }
    localStorage.setItem("results", JSON.stringify(existingResults));
    setTimeout(() => {
      window.location.replace("../home.html");
    }, 1500);
  }
}

function handleOptionSelect(button, option) {
  if (submitted) return; // if asnwer were already submitted

  container.querySelectorAll(".option.selected").forEach((btn) => {
    btn.classList.remove("selected");
  });

  button.classList.add("selected");
  selectedOption = option;
  submitButton.disabled = false; //renable submit
}

function checkAndSubmit() {
  if (!selectedOption && seconds == 0) {
    selectedOption = ""; // Treat no selection as an answer
  }
  submitted = true;
  submitButton.disabled = true; // fixing the bug of submit as user kkeeps clicking
  clearInterval(timerInterval);
  allOptionsButtons.forEach((btn) => {
    btn.disabled = true;
    if (btn.dataset.answer === correctAnswer) {
      // check dataset for the selected button
      btn.classList.add("correct");
    }
    if (
      btn.dataset.answer === selectedOption && // loop over all button when dataset = selected and answer is false make it wrong
      selectedOption !== correctAnswer
    ) {
      btn.classList.add("wrong");
    } else if (
      (btn.dataset.answer === selectedOption && selectedOption) ===
      correctAnswer
    ) {
      score++;
    }
  });

  setTimeout(() => {
    questionIndex++;
    displayQuestion();
  }, 2000);
}
submitButton.addEventListener("click", checkAndSubmit);
window.onload = displayQuestion;
