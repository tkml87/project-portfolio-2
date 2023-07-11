/* jshint esversion: 6 */
const headerElement = document.getElementById('header');
const runButton = document.getElementById('run-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

/* global variables elements */
let shuffledQuestions;
let currentQuestionIndex;

/* List of the questions - inspired by webdev simplified */
const questions = [
    {
        question: 'How old is Percy in The Lightning Thief?',
        answers: [
            { text: '12', correct: true },
            { text: '20', correct: false },
            { text: '15', correct: false },
            { text: '13', correct: false }
        ]
    },
    {
        question: 'In The Lightning Thief, how long has Annabeth been at Camp?',
        answers: [
            { text: 'Since she was 3', correct: false },
            { text: '10 years', correct: false },
            { text: 'Since she was 7', correct: true },
            { text: 'Since she was a baby', correct: false }
        ]
    },
    {
        question: 'The Lightning Thief: which object is missing besides Zeus master Bolt?',
        answers: [
            { text: "Zeus's master lightning bolt", correct: false },
            { text: "Hades's helm of darkness", correct: true },
            { text: "Poseidon's trident", correct: false },
            { text: "Annabeth's hat", correct: false }
        ]
    },
    {
        question: 'The See of Monsters: why did Percy and his friends need the Golden Fleece?',
        answers: [
            { text: 'To heal Percy', correct: false },
            { text: 'To restore the camp borders', correct: true },
            { text: 'To calm the monsters in the sea', correct: false },
            { text: 'To find Grover', correct: false }
        ]
    },
    {
        question: 'At the end of the second book, Sea of Monsters, what did the Golden Fleece unexpectedly do?',
        answers: [
            { text: 'Bring Thalia back to life', correct: true },
            { text: 'Turn chiron into a horse', correct: false },
            { text: 'Overgrow the strawberry fields', correct: false },
            { text: "Destroy Thalia's tree", correct: false }
        ]
    },
    {
        question: "In Sea of Monsters, who did Annabeth pretend to be in Polyphemus' cave?",
        answers: [
            { text: 'A Sheep', correct: false },
            { text: 'Athena', correct: false },
            { text: 'A female Cyclops', correct: false },
            { text: 'Nobody', correct: true }
        ]
    },
    {
        question: "Where did Percy, Thalia, and Annabeth go to meet Grover in the beginning of the Titans' Curse?",
        answers: [
            { text: 'Westend hall', correct: false },
            { text: 'Westover hall', correct: true },
            { text: 'Eastover hall', correct: false },
            { text: 'Westpoint hall', correct: false }
        ]
    },
    {
        question: "Titans' Curse: what was the name of the Old Man of the Sea whom Percy talked to in San Francisco?",
        answers: [
            { text: 'Nereus', correct: true },
            { text: 'Mr. Whipple', correct: false },
            { text: 'Apollo', correct: false },
            { text: 'Neptune', correct: false }
        ]
    },
    {
        question: 'How did Thalia, the daughter of Zeus, escape the prophecy?',
        answers: [
            { text: 'Her father smote her down with an lightning bolt', correct: false },
            { text: 'She settled down and got married', correct: false },
            { text: 'She joined Artemis and her Band of Hunters', correct: true },
            { text: 'She left New York and was never heard of again', correct: false }
        ]
    },
    {
        question: "What is the name of Sally Jackson's boyfriend?",
        answers: [
            { text: 'Stanley Google', correct: false },
            { text: 'Paul Blofis', correct: true },
            { text: 'Jeff Burton', correct: false },
            { text: 'Adam Berstein', correct: false }
        ]
    }
];

/* configuring the buttons and event listener - inspired by webdev simplified */
runButton.addEventListener('click', runGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

/* starting the game - inspired by webdev simplified */
function runGame() {
    runButton.classList.add('hide');
    headerElement.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

/* about the questions' phase - inspired by webdev simplified */
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerText = questionNumber + " - " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

/* logic loop - inspired by webdev simplified */
function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        gotoResult();
    }
}

/* game answering conditions - inspired by webdev simplified */
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

/* final game - inspired by chart js */
function gotoResult() {
    window.location = "result.html";
    headerElement.classList.add('hide');
}

/* restarting game - inspired by chart js */
function gotoLink() {
    location.href = "index.html";
}