import { url } from "./consts.js";
const log = document.querySelector(".log");
const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let passwordLabel = document.querySelector(".passLabel");

  try {
    const response = await fetch(`${url}/quiquiz/api/login.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.status === "success") {
      alert(data.message);
      window.localStorage.setItem("loggedUser", data.user.id);
      if (data.user.role === "admin") {
        window.location.replace(`${url}/quiquiz/dashboard.html`);
      } else {
        window.location.replace(`${url}/quiquiz/home.html`);
      }
    } else {
      // wrong cred
      passwordLabel.classList.add("error");
      passwordLabel.textContent = data.message;
      setTimeout(() => {
        passwordLabel.classList.remove("error");
        passwordLabel.textContent = "Your Password";
      }, 5000);
    }
  } catch (error) {
    console.log("Error: ", error);
    alert("Something Went Wrong. Try Again!");
  }
});

log.addEventListener("click", () => {
  window.location.replace("/register.html");
});
