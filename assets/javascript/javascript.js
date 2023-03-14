// Get DOM elements
const startButton = document.getElementById("start-button");
const timerElement = document.getElementById("timer");
const timeRemainingElement = document.getElementById("time-remaining");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const choicesContainer = document.getElementById("choices-all");
const gameOver = document.getElementById("game-over");
const scoreElement = document.getElementById("score");
const initialsInput = document.getElementById("initials");
const saveScoreButton = document.getElementById("save-score");
const highScoresContainer = document.getElementById("high-scores");
const goBackButton = document.getElementById("go-back"); 

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
];

// Variables for current question index and remaining time

let currentQuestionIndex = 0;
let timeRemaining = 60;
let timer;

// Event Listeners

startButton.addEventListener("click", startQuiz);
saveScoreButton.addEventListener("click", saveScore);
goBackButton.addEventListener("click", goBack);

