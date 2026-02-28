const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language",
    ],
    answer: 1,
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: 2,
  },
  {
    question: "Which is not a JavaScript Framework?",
    options: ["Python Script", "React", "Angular", "Vue"],
    answer: 0,
  },
  {
    question: "Which is used for Connect To Database?",
    options: ["PHP", "HTML", "JS", "CSS"],
    answer: 0,
  },
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const questionCount = document.getElementById("questionCount");
const timerDisplay = document.getElementById("timer");
const nextBtn = document.getElementById("nextBtn");
const scoreText = document.getElementById("scoreText");

function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  resetState();

  const q = questions[currentQuestion];
  questionText.innerText = q.question;
  questionCount.innerText = `Question ${currentQuestion + 1} of ${questions.length}`;

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.className =
      "w-full text-left px-4 py-2 border rounded hover:bg-gray-100";
    button.onclick = () => selectOption(button, index);
    optionsContainer.appendChild(button);
  });

  startTimer();
}

function startTimer() {
  timeLeft = 10;
  timerDisplay.innerText = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      autoMove();
    }
  }, 1000);
}

function selectOption(button, index) {
  clearInterval(timerInterval);

  const correctIndex = questions[currentQuestion].answer;

  const buttons = optionsContainer.children;

  for (let btn of buttons) {
    btn.disabled = true;
  }

  if (index === correctIndex) {
    button.classList.add("bg-green-200", "border-green-500");
    score++;
  } else {
    button.classList.add("bg-red-200", "border-red-500");
    buttons[correctIndex].classList.add("bg-green-200", "border-green-500");
  }

  nextBtn.classList.remove("hidden");
}

function autoMove() {
  const correctIndex = questions[currentQuestion].answer;
  const buttons = optionsContainer.children;

  buttons[correctIndex].classList.add("bg-green-200", "border-green-500");

  for (let btn of buttons) {
    btn.disabled = true;
  }

  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  scoreText.innerText = `You scored ${score} out of ${questions.length}`;
}

function restartQuiz() {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}

function resetState() {
  clearInterval(timerInterval);
  nextBtn.classList.add("hidden");
  optionsContainer.innerHTML = "";
}