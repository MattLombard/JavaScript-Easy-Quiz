// Get DOM elements
const startButton = document.getElementById("start-button");
const timerElement = document.getElementById("timer");
const timeRemainingElement = document.getElementById("time-remaining");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const choicesContainer = document.getElementById("choices-container");
const gameOver = document.getElementById("game-over");
const scoreElement = document.getElementById("score");
const initialsInput = document.getElementById("initials");
const saveScoreButton = document.getElementById("save-score");
const highScoresContainer = document.getElementById("high-scores");
const goBackButton = document.getElementById("go-back");
const splashScreenContainer = document.getElementById("splash-screen");

// Questions array
const questions = [
  {
    text: "What does a .js file refer to?",
    choices: ["JuicySeed", "JavaScript", "Juicy J", "JustShoot"],
    correctIndex: 1,
  },
  {
    text: "Inside which HTML element do we put the JavaScript?",
    choices: ["<script>", "<body>", "<footer>", "<scripting>"],
    correctIndex: 0,
  },
  {
    text: "Where is the correct place to insert a JavaScript?",
    choices: ["<head>", "<body>", "<footer>", "<scripting>"],
    correctIndex: 1,
  },
];

// Variables for current question index and remaining time

let currentQuestionIndex = 0;
let timeRemaining = 60;
let timer;

// Event Listeners

startButton.addEventListener("click", startQuiz);
saveScoreButton.addEventListener("click", saveScore);
goBackButton.addEventListener("click", goBack);

// Function to start the game

function startQuiz() {
  startButton.classList.add("hide");
  quizContainer.classList.remove("hide");
  timerElement.classList.remove("hide");
  // start timer and show first question
  timer = setInterval(updateTime, 1000);
  showQuestion();
}

// update the time remaining
function updateTime() {
  timeRemaining--;
  timeRemainingElement.textContent = timeRemaining;
  // to end quiz when timer hits 0
  if (timeRemaining <= 0) {
    endQuiz();
  }
}

// Function to display the question and choices
function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.innerText = question.text;
  choicesContainer.innerHTML = "";

  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.innerText = choice;
    button.addEventListener("click", () => handleAnswer(index));
    choicesContainer.appendChild(button);
  });
}
// function that will handle the users choice
function handleAnswer(choiceIndex) {
  if (choiceIndex !== questions[currentQuestionIndex].correctIndex) {
    timeRemaining = Math.max(0, timeRemaining - 10);
    timeRemainingElement.textContent = timeRemaining;
  }

  //Move to next question or the quiz will end
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length && timeRemaining > 0) {
    showQuestion();
  } else {
    endQuiz();
  }
}

// Function that will end the quiz
function endQuiz() {
  clearInterval(timer);
  quizContainer.classList.add("hide");
  gameOver.classList.remove("hide");
  scoreElement.innerText = timeRemaining;
}

//function to save score

function saveScore(event) {
  event.preventDefault();

  const initials = initialsInput.value.trim();
  if (!initials) {
    return;
  }

  const highScores = JSON.parse(localStorage.getItem("highscores")) || [];
  const newScore = { initials, score: timeRemaining };
  highScores.push(newScore);
  localStorage.setItem("highscores", JSON.stringify(highScores));

  // Display initials and score next to the score element
  const scoreDisplay = document.createElement("div");
  scoreDisplay.innerHTML = `${initials}: ${timeRemaining}`;
  scoreElement.parentNode.insertBefore(scoreDisplay, scoreElement.nextElementSibling
  );

  // Hide initials input and save score button
  initialsInput.classList.add("hide");
  saveScoreButton.classList.add("hide");
  
}
// Function to go back and replay the quiz
function goBack() {
    // removes the score display element
  const scoreDisplay = scoreElement.nextSibling;
  if (scoreDisplay) {
    scoreElement.parentNode.removeChild(scoreDisplay);
  }

  highScoresContainer.classList.add("hide");
  gameOver.classList.add("hide");
  initialsInput.classList.remove("hide");
  saveScoreButton.classList.remove("hide");
  startButton.classList.remove("hide");
  timerElement.classList.add("hide");
  currentQuestionIndex = 0;
  timeRemaining = 60;
  timeRemainingElement.textContent = timeRemaining;
}
