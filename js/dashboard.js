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
}
