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

if (!localStorage.getItem("quizzes")) {
  let quizzes = [
    {
      id: 1,
      title: "JavaScript Basics",
      score: 0,
      questions: [
        {
          question: "Which company developed JavaScript?",
          options: ["Microsoft", "Netscape", "Google", "Apple"],
          answer: "Netscape",
        },
        {
          question: "Which symbol is used for comments in JavaScript?",
          options: ["//", "<!-- -->", "/* */", "#"],
          answer: "//",
        },
        {
          question: "What data type is `null` in JavaScript?",
          options: ["Object", "Null", "Undefined", "Boolean"],
          answer: "Object",
        },
      ],
    },
    {
      id: 2,
      title: "HTML & CSS",
      score: 0,
      questions: [
        {
          question: "What does HTML stand for?",
          options: [
            "HyperText Markup Language",
            "HighText Markdown Language",
            "Hyperloop Machine Language",
            "Hyper Transfer Markup Language",
          ],
          answer: "HyperText Markup Language",
        },
        {
          question: "Which property changes text color in CSS?",
          options: [
            "font-style",
            "background-color",
            "color",
            "text-decoration",
          ],
          answer: "color",
        },
        {
          question: "Which HTML tag is used for creating a hyperlink?",
          options: ["<a>", "<link>", "<href>", "<hyperlink>"],
          answer: "<a>",
        },
      ],
    },
    {
      id: 3,
      title: "General Knowledge",
      score: 0,
      questions: [
        {
          question: "What is the capital city of France?",
          options: ["London", "Berlin", "Paris", "Madrid"],
          answer: "Paris",
        },
        {
          question: "Which planet is known as the Red Planet?",
          options: ["Earth", "Saturn", "Mars", "Jupiter"],
          answer: "Mars",
        },
        {
          question: "What is the largest ocean on Earth?",
          options: ["Atlantic", "Indian", "Arctic", "Pacific"],
          answer: "Pacific",
        },
      ],
    },
  ];

  localStorage.setItem("quizzes", JSON.stringify(quizzes));
}
