import { url } from "./consts.js";
let selectedId = localStorage.getItem("selectedQuiz");
const container = document.getElementById("container");
const form = document.getElementById("quiz-form");
const submitButton = document.getElementById("log-reg");
const questionElement = document.querySelector(".question");
const timerElement = document.getElementById("timer");
const timerContainer = document.querySelector(".timer");
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
if (!loggedUser) {
  window.location.replace("/quiquiz/index.html");
}
let user = JSON.parse(localStorage.getItem("loggedUser"));

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

let questions = [];
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
  timerContainer.classList.remove("ending");
  updateTimer();
  timerInterval = setInterval(() => {
    seconds--;
    updateTimer();
    if (seconds < 5) {
      timerContainer.classList.add("ending");
    }
    if (seconds == 0) {
      clearInterval(timerInterval);
      timerContainer.classList.remove("ending");
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

  if (questionIndex < questions.length) {
    const questionContent = questions[questionIndex];
    console.log(questionContent);
    questionElement.innerText = questionContent.value;
    correctAnswer = getCorrectAnswer(questionContent.id);
    allOptionsButtons = [];

    fetch(`${url}/quiquiz/api/getOptions.php?question_id=${questionContent.id}`)
      .then((res) => res.json())
      .then((optionsData) => {
        optionsData.options.forEach((option) => {
          const button = document.createElement("button");
          button.type = "button";
          button.classList.add("option");
          button.innerText = option.value;
          button.dataset.answer = option.value;
          button.addEventListener("click", () => {
            handleOptionSelect(button, option.value);
          });
          container.appendChild(button);
          allOptionsButtons.push(button);
          console.log(allOptionsButtons);
        });
        startTimer();
      })
      .then(() => {
        correctAnswer = getCorrectAnswer(questionContent.id);
      });
  } else {
    saveResults();
    let message = "";
    switch (score) {
      case 3:
        message = "Excellent!";
        break;
      case 2:
        message = "Great Job!";
        break;
      case 1:
        message = "Nice Try!";
        break;
      case 0:
        message = "Hard Luck!";
        break;
      default:
        message = "Quiz Finished!";
    }
    questionElement.innerHTML = `<h1>${message}<h1><h2>Your Score: ${score}/3</h2>`;
    container.innerHTML = "";
    submitButton.style.display = "none";
    clearInterval(timerInterval);
    console.log(`${score}/3`);
  }
}

function handleOptionSelect(button, option) {
  if (submitted) return; // if asnwer were already submitted
  container.querySelectorAll(".option.selected").forEach((btn) => {
    btn.classList.remove("selected");
  });
  button.classList.add("selected");
  selectedOption = option;
  submitButton.disabled = false;
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
      btn.classList.add("correct");
    }
    if (
      btn.dataset.answer === selectedOption &&
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

function getQuestions() {
  fetch(`${url}/quiquiz/api/getQuestions.php?quiz_id=${selectedId}`)
    .then((response) => response.json())
    .then((data) => {
      questions = data.questions;
      displayQuestion();
    })
    .catch((error) => {
      console.error("Error fetching questions:", error);
    });
}

function getCorrectAnswer(questionId) {
  fetch(`${url}/quiquiz/api/getCorrectAnswer.php?question_id=${questionId}`)
    .then((response) => response.json())
    .then((data) => {
      correctAnswer = data.correct_answer;
      return correctAnswer;
    })
    .catch((error) => {
      console.error("Error fetching correct answer:", error);
      return null;
    });
}

submitButton.addEventListener("click", checkAndSubmit);
window.onload = getQuestions;
