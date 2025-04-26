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
    return;
  }
  //
  try {
    const resposne = await fetch(`${url}/quiquiz/api/register.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await resposne.json();
    console.log(data);
    if (data.status === "success") {
      alert(data.message);
      window.location.replace("/quiquiz/login.html");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
});
console.log(log);
log.addEventListener("click", () => {
  window.location.replace("/quiquiz/login.html");
});
