const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

// Role check: redirect if not admin
if (!loggedUser) {
  window.location.replace("../login.html");
} else if (loggedUser.role !== "admin") {
  window.location.replace("../home.html");
} else {
  console.log("Welcome, Admin!");
}

const container = document.getElementById("users-table");
const refreshButton = document.getElementById("refresh-btn");
let users = JSON.parse(localStorage.getItem("users"));
let results = JSON.parse(localStorage.getItem("results"));
function buildTable() {
  let table = `
    <table>
      <tr>
        <th>Email</th>
        <th>Role</th>
        <th>Quiz Scores</th>
      </tr>
  `;

  users.forEach((user) => {
    const userResults = results.filter((r) => r.user === user.email);
    console.log(userResults);

    let scores;
    if (userResults.length > 0) {
      scores = userResults
        .map((result) => `Quiz(${result.quizId}): ${result.score}/3`)
        .join("<br>"); // join elements with br to be on diff erent line
    } else {
      scores = "No quizzes for this user";
    }
    console.log(scores);

    const role = user.email === "admin@quiz.com" ? "admin" : "user";
    table += `
      <tr>
        <td>${user.email}</td>
        <td>${role}</td>
        <td>${scores}</td>
      </tr>
    `;
  });
  table += `</table>`;
  container.innerHTML = table;
}

buildTable();
refreshButton.addEventListener("click", buildTable);
