let counter = 0;
let goodCounter = 0;
let badCounter = 0;
const quizTitle = document.querySelector(".quiz-title");
const card = document.querySelectorAll(".quiz-item");
const mainBox = document.querySelector(".qust-box");
const scoreCount = document.querySelector(".scoreCount");
const startBtn = document.querySelector(".startBtn");
const endBtn = document.querySelector("button");
const quizComplete = document.querySelector(".quiz-modal");
const hearts = document.querySelectorAll(".heart");

let wrongAnswer = new Audio("/src/wrong.mp3");
let applause = new Audio("/src/applause.mp3");
let right = new Audio("/src/right.mp3");

startBtn.addEventListener("click", () => {
    let startModal = document.querySelector(".start");
    startModal.style.transition = "0.5s ease";
    startModal.style.opacity = "0";
    startModal.style.transform = "scale(0)";
});

endBtn.addEventListener("click", () => {
    location.reload();
});

function scoreCountUp() {
    scoreCount.innerHTML = goodCounter;
}

function nexpPage() {
    if (answer.length === counter) {
        endQuiz();
        return;
    }
    renderQuizTitle(counter);
    renderQuizCards(counter);
}

function renderQuizTitle(counter) {
    quizTitle.textContent = quiz[counter]["question"];
}
renderQuizTitle(counter);

function renderQuizCards(counter) {
    let quizCounter = 0;
    card.forEach((item) => {
        quizCounter++;
        item.innerHTML = quiz[counter]["answer"][quizCounter];
    });
}
renderQuizCards(counter);

function makeFourCard(counter) {
    for (let i = 0; i < 4; i++) {
        let newCard = document.createElement("div");
        mainBox.append(newCard);
        newCard.classList.add("quiz-item");
        newCard.innerHTML = quiz[counter]["answer"][i + 1];
    }
}

function endQuiz() {
    let finishText = document.querySelector(".quiz-complete-text");
    applause.play();
    quizComplete.style.display = "block";
    if (badCounter === hearts.length) {
        finishText.textContent = `Увы, вы не смогли пройти квиз до конца, вы набрали ${goodCounter} очков`;
    } else if (goodCounter === answer.length) {
        finishText.textContent = `Ого, вы ответили верно на все ${answer.length} вопросов!`;
    } else {
        finishText.textContent = `Вы молодец! Вы ответили верно на ${goodCounter} из ${answer.length} вопросов`;
    }
}

function killHeart() {
    hearts[badCounter].classList.add("dark-heart");
    badCounter++;
    if (badCounter === hearts.length) {
        endQuiz();
    }
}

mainBox.addEventListener("click", (e) => {
    let target = e.target;
    if (target.className === "quiz-item") {
        if (target.textContent === answer[counter]["answer"]) {
            right.play();
            target.classList.add("goodAnswer");
            counter++;
            goodCounter++;
            scoreCountUp();
            setTimeout(function() {
                target.classList.remove("goodAnswer");
            }, 1000);
            setTimeout(nexpPage, 1000);
        } else {
            wrongAnswer.play();
            target.classList.add("badAnswer");
            counter++;
            goodCounter += 0;
            killHeart();
            scoreCountUp();
            setTimeout(function() {
                target.classList.remove("badAnswer");
            }, 1000);
            setTimeout(nexpPage, 1000);
        }
    }
});