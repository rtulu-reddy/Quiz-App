const questions = [
    {
        question: "What is the largest internal organ in the human body?",
        answers: [
            { text: "Lungs", correct: false },
            { text: "Heart", correct: false },
            { text: "Kidneys", correct: false },
            { text: "Liver", correct: true },
        ]
    },
    {
        question: "What is the percentage of the Earth covered by water?",
        answers: [
            { text: "51%", correct: false },
            { text: "61%", correct: false },
            { text: "71%", correct: true },
            { text: "81%", correct: false },
        ]
    },
    {
        question: "What was the name of Drake’s 2023 album?",
        answers: [
            { text: "Take Care", correct: false },
            { text: "Scorpion", correct: false },
            { text: "For All the Dogs", correct: true },
            { text: "Views", correct: false },
        ]
    },
    {
        question: "Which of the following British presenters never presented ‘Strictly Comes Dancing’?",
        answers: [
            { text: "Claudia Winkleman", correct: false },
            { text: "Tess Daly", correct: false },
            { text: "Andrea Hamilton", correct: false },
            { text: "Stacey Dooley", correct: true },
        ]
    },
    {
        question: "Which country is the band AC/DC from?",
        answers: [
            { text: "New Zealand", correct: false },
            { text: "UK", correct: false },
            { text: "USA", correct: false },
            { text: "Australia", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("ans-btn");
const nextButton = document.getElementById("next-btn");

// 🆕 NEW TIMER VARIABLES
const TIME_LIMIT = 30; // Set to 30 seconds
let timeRemaining = TIME_LIMIT;
let timerInterval;
const timerDisplay = document.createElement("div");
timerDisplay.id = "timer-display";

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    
    // 🆕 Add timer element to the DOM if it's not already there
    timeRemaining = TIME_LIMIT;
    if (!document.getElementById("timer-display")) {
        // Insert the timer above the question
        questionElement.parentNode.insertBefore(timerDisplay, questionElement);
    }
    timerDisplay.style.display = "block"; // Ensure it is visible
    
    showQuestion();
}

function showQuestion() {
    resetState();
    // 🆕 Start the timer for the new question
    startTimer();
    
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    // 🆕 Stop the timer when changing states
    stopTimer();
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// 🆕 FUNCTION TO START TIMER
function startTimer() {
    timeRemaining = TIME_LIMIT;
    timerDisplay.innerHTML = `Time: ${timeRemaining}s`;
    
    // Clear any existing timer before starting a new one
    clearInterval(timerInterval); 
    
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerDisplay.innerHTML = `Time: ${timeRemaining}s`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            timeUp();
        }
    }, 1000);
}

// 🆕 FUNCTION TO STOP TIMER
function stopTimer() {
    clearInterval(timerInterval);
}

// 🆕 FUNCTION WHEN TIME IS UP
function timeUp() {
    // Reveal correct answer and disable all buttons
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function selectAnswer(e) {
    // 🆕 Stop the timer immediately when an answer is selected
    stopTimer();
    
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    // 🆕 Hide the timer display on the score screen
    timerDisplay.style.display = "none";
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();