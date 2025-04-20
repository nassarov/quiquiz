const log = document.querySelector(".log");
const loginForm = document.querySelector(".login-form");
let users = JSON.parse(localStorage.getItem("users")) || [];

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let passwordLabel = document.querySelector(".passLabel");
  let isAdmin = false;
  let found = false;
  users.forEach((user) => {
    if (user.email === email && user.password === password) {
      found = true;
      if (user.email === "admin@quiz.com" && user.password === "admin123") {
        isAdmin = true;
      }
    }
  });

  if (found) {
    alert(`Welcome back, ${email}!`);
    if (isAdmin) {
      window.location.replace("../dashboard.html");
    } else {
      window.location.replace("../home.html");
    }
  } else {
    console.log("Incorrect email or password!");
    passwordLabel.classList.add("error");
    passwordLabel.textContent = "Wrong credentials!";
    setTimeout(() => {
      passwordLabel.classList.remove("error");
      passwordLabel.textContent = "Your Password";
    }, 5000);
  }
});
log.addEventListener("click", () => {
  window.location.replace("../register.html");
});
