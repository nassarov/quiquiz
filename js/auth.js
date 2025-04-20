const log = document.querySelector(".log");
const regForm = document.querySelector(".reg-form");
console.log(regForm);
let users = JSON.parse(localStorage.getItem("users"));
console.log(users);
regForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirm = document.getElementById("confirm-password").value;
});
