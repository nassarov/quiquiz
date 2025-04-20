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
  if (password !== confirm) {
    console.log(`${password} not equal ${confirm}`);
    let confirmLabel = document.querySelector(".confirm");
    confirmLabel.classList.add("error");
    confirmLabel.textContent = "Make sure confirmation is same as password!";

    setTimeout(() => {
      confirmLabel.classList.remove("error");
      confirmLabel.textContent = "Confirm Your Password";
    }, 5000);
  } else {
    let exists = false;
    for (let user of users) {
      if (user.email === email) {
        exists = true;
        break;
      }
    }
  }
});
