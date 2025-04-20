const logButton = document.getElementById("log-reg");
console.log(logButton);
logButton.addEventListener("click", () => {
  window.location.href = "../register.html";
});

// check first if users exist
if (!localStorage.getItem("users")) {
  let users = [
    { email: "admin@quiz.com", password: "admin123", role: "admin" },
  ];
  localStorage.setItem("users", JSON.stringify(users));
}
