

//conection with database should be done in java but ....


const questions = [
    {
        question: "Which year was Michael Jackson born?",
        options: ['1958', '1961', '1965', '1969'],
        answerIndex: 0,
    },
    {
        question: "Which Michael Jackson album is known for its iconic album cover featuring a black jacket and white socks?",
        options: ['Thriller', 'Bad', 'Dangerous', 'Off the Wall'],
        answerIndex: 1,
    },
    {
        question: "What was the name of Michael Jackson's pet chimpanzee?",
        options: ['Bubbles', 'Coco', 'Charlie', 'Max'],
        answerIndex: 0,
    },
    {
        question: "Which song is often considered Michael Jackson's signature dance move?",
        options: ['Thriller', 'Smooth Criminal', 'Billie Jean', 'Beat It'],
        answerIndex: 2,
    },
    {
        question: "In which year did Michael Jackson release the album 'Bad'?",
        options: ['1982', '1984', '1987', '1990'],
        answerIndex: 2,
    },
    {
        question: "Who was Michael Jackson married to from 1994 to 1996?",
        options: ['Janet Jackson', 'Madonna', 'Lisa Marie Presley', 'Whitney Houston'],
        answerIndex: 2,
    },
    {
        question: "Which song features the lyrics 'It's close to midnight and something evil's lurking in the dark'?",
        options: ['Beat It', 'Thriller', 'Billie Jean', 'Smooth Criminal'],
        answerIndex: 1,
    },
    {
        question: "Which album contains the song 'Smooth Criminal'?",
        options: ['Off the Wall', 'Thriller', 'Bad', 'Dangerous'],
        answerIndex: 3,
    },
    {
        question: "What was the name of Michael Jackson's ranch in California?",
        options: ['Neverland Ranch', 'Graceland', 'Moonwalk Manor', 'Jackson Estate'],
        answerIndex: 0,
    },
    {
        question: "Which song was the first music video by a black artist to be played in heavy rotation on MTV?",
        options: ['Thriller', 'Billie Jean', 'Beat It', 'Black or White'],
        answerIndex: 1,
    },
];


const startButton = document.getElementById('startBtn');
const optionsContainer = document.getElementById('optionsContainer');
const questionElement = document.getElementById('question');
const resultContainer = document.getElementById('resultContainer');
const correctResultElement = document.getElementById('correctResult'); // Added correct result element

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    optionsContainer.style.display = 'flex';
    showQuestion();
});

const optionsDiv = document.getElementById('optionsContainer');
const optionButtons = optionsDiv.querySelectorAll('.option');
const resultElement = document.getElementById('result');

let currentQuestion = 0;
let correctAnswers = 0;

function showQuestion() {
    if (currentQuestion < questions.length) {
        const questionObj = questions[currentQuestion];
        questionElement.textContent = questionObj.question;

        questionObj.options.forEach((option, index) => {
            optionButtons[index].textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        });
    }
}

function checkQuestion(userAnswerIndex) {
    const questionObj = questions[currentQuestion];

    if (userAnswerIndex === questionObj.answerIndex) {
        correctAnswers++;
    }

    currentQuestion++;

    if (currentQuestion === questions.length) {
        optionsDiv.style.display = 'none';
        showResult();
    } else {
        showQuestion();
    }
}

function showResult() {
    questionElement.textContent = `Quiz complete! You got ${correctAnswers} right!`;
    resultContainer.style.display = 'block';
    correctResultElement.textContent = `Congratulations, you got ${correctAnswers} right!`; // Display correct answers
}

function reset() {
    correctAnswers = 0;
    currentQuestion = 0;
    optionsDiv.style.display = 'flex';
    resultContainer.style.display = 'none';
    showQuestion();
    optionButtons.forEach(button => {
        button.disabled = false;
    });
}

optionButtons.forEach((button, index) => {
    button.addEventListener('click', () => checkQuestion(index));
});

document.getElementById('resetBtn').addEventListener('click', reset);

showQuestion();