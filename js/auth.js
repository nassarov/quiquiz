const log = document.querySelector(".log");
const regForm = document.querySelector(".reg-form");
console.log(regForm);
regForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let confirm = document.getElementById("confirm-password").value.trim();
  let confirmLabel = document.querySelector(".confirm");

  if (password.length < 8) {
    console.log("Password must be at least 8 characters long");
    confirmLabel.classList.add("error");
    confirmLabel.textContent = "Password must be at least 8 characters long!";

    setTimeout(() => {
      confirmLabel.classList.remove("error");
      confirmLabel.textContent = "Enter Your Password";
    }, 5000);
    return;
  }

  if (password !== confirm) {
    console.log(`${password} not equal ${confirm}`);
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
    if (exists) {
      alert(`User with email ${email} already exists!`);
      console.log(`Already exist ${email}`);
    } else {
      users.push({ email, password, role: "user" });
      localStorage.setItem("users", JSON.stringify(users));
      console.log(`Registration successful for ${email}`);
      alert("Registration successful! It's time to Login...");
      window.location.replace("/quiquiz/login.html");
    }
    console.log(`status:${exists}`);
  }
  console.log(localStorage.getItem("users"));
});
console.log(log);
log.addEventListener("click", () => {
  window.location.replace("/quiquiz/login.html");
});
