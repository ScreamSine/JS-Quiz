let counter = 0;
const quizTitle = document.querySelector(".quiz-title");
const card = document.querySelectorAll(".quiz-item");
const mainBox = document.querySelector(".qust-box");
const scoreCount = document.querySelector(".scoreCount");
const finalCount = document.querySelector(".finalCount");
const button = document.querySelector("button");
const quizComplete = document.querySelector(".quiz-complete");
const blur = document.querySelector(".blur");

let wrongAnswer = new Audio("/src/wrong.mp3");
let applause = new Audio("/src/applause.mp3");
let right = new Audio("/src/right.mp3");

button.addEventListener("click", () => {
    location.reload();
});

function scoreCountUp() {
    scoreCount.innerHTML = counter;
    finalCount.innerHTML = counter;
}

function nexpPage() {
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

mainBox.addEventListener("click", (e) => {
    let target = e.target;
    if (target.className === "quiz-item") {
        if (target.textContent === answer[counter]["answer"]) {
            right.play();
            target.classList.add("goodAnswer");
            counter++;
            scoreCountUp();
            if (answer.length === counter) {
                setTimeout(function() {
                    applause.play();
                    quizComplete.style.display = "block";
                    blur.style.display = "block";
                }, 1000);
            }
            setTimeout(function() {
                target.classList.remove("goodAnswer");
            }, 1000);
            setTimeout(nexpPage, 1000);
        } else {
            target.classList.add("badAnswer");
            wrongAnswer.play();
            setTimeout(function() {
                target.classList.remove("badAnswer");
            }, 1000);
        }
    }
});