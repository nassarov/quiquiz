const logButton = document.getElementById("log-reg");
console.log(logButton);
logButton.addEventListener("click", () => {
  window.location.href = "/register.html";
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
      title: "World Capitals🌍",
      score: 0,
      questions: [
        {
          question: "What is the capital of Japan?",
          options: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
          answer: "Tokyo",
        },
        {
          question: "Which city is the capital of Australia?",
          options: ["Sydney", "Melbourne", "Canberra", "Perth"],
          answer: "Canberra",
        },
        {
          question: "What is the capital of Canada?",
          options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
          answer: "Ottawa",
        },
      ],
    },
    {
      id: 2,
      title: "Famous Movies🎬",
      score: 0,
      questions: [
        {
          question: "Which movie features the quote 'I'll be back'?",
          options: ["Predator", "The Terminator", "RoboCop", "Die Hard"],
          answer: "The Terminator",
        },
        {
          question: "Who directed the movie 'Inception'?",
          options: [
            "Steven Spielberg",
            "Christopher Nolan",
            "James Cameron",
            "Quentin Tarantino",
          ],
          answer: "Christopher Nolan",
        },
        {
          question: "Which movie won Best Picture at the Oscars in 2020?",
          options: ["1917", "Joker", "Parasite", "Ford v Ferrari"],
          answer: "Parasite",
        },
      ],
    },
    {
      id: 3,
      title: "General Knowledge🧠",
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
    {
      id: 4,
      title: "World History📜",
      score: 0,
      questions: [
        {
          question: "Who was the first President of the United States?",
          options: [
            "Thomas Jefferson",
            "George Washington",
            "Abraham Lincoln",
            "John Adams",
          ],
          answer: "George Washington",
        },
        {
          question: "In which year did World War II end?",
          options: ["1942", "1945", "1948", "1950"],
          answer: "1945",
        },
        {
          question: "Which ancient civilization built the pyramids?",
          options: ["Romans", "Greeks", "Egyptians", "Mayans"],
          answer: "Egyptians",
        },
      ],
    },
    {
      id: 5,
      title: "Science & Nature🌿",
      score: 0,
      questions: [
        {
          question: "What gas do plants absorb from the atmosphere?",
          options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
          answer: "Carbon Dioxide",
        },
        {
          question: "What part of the cell contains DNA?",
          options: ["Mitochondria", "Nucleus", "Cytoplasm", "Ribosome"],
          answer: "Nucleus",
        },
        {
          question: "Which animal is the largest mammal on Earth?",
          options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
          answer: "Blue Whale",
        },
      ],
    },
    {
      id: 6,
      title: "Music & Bands🎶",
      score: 0,
      questions: [
        {
          question: "Who is known as the 'King of Pop'?",
          options: [
            "Elvis Presley",
            "Michael Jackson",
            "Prince",
            "Justin Timberlake",
          ],
          answer: "Michael Jackson",
        },
        {
          question: "Which band wrote the song 'Bohemian Rhapsody'?",
          options: ["The Beatles", "Queen", "Led Zeppelin", "Pink Floyd"],
          answer: "Queen",
        },
        {
          question: "What is the best-selling album of all time?",
          options: [
            "Thriller",
            "Back in Black",
            "The Dark Side of the Moon",
            "Hotel California",
          ],
          answer: "Thriller",
        },
      ],
    },
  ];

  localStorage.setItem("quizzes", JSON.stringify(quizzes));
}
