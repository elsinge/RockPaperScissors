const choices = new Map([
    ["rock", {beats: ["scissors", "lizard"]}],
    ["paper", {beats: ["rock", "spock"]}],
    ["scissors", {beats: ["paper", "lizard"]}]
]);

let rounds;
console.log("rounds=" + rounds);

let draws = 0;
const nextRoundBtn = document.getElementById("next-round-btn");
const fightBtn = document.getElementById("fight-btn");
const userChoiceEl = document.getElementById("user-choice-el");
const computerChoiceEl = document.getElementById("computer-choice-el");
const roundsEl = document.getElementById("rounds-el");

const computer = {
    alive: true,
    choice: null,
    wins: 0
};
const user = {
    alive: true,
    choice: null,
    wins: 0
};

const gameElements = document.getElementById("game-elements");
gameElements.style.display = "none";

function setRounds() {
    const setRoundsEl = document.getElementById("set-rounds-el");
    rounds = setRoundsEl.value;

    const setupEl = document.getElementById("setup-el");
    setupEl.style.display = "none";

    roundsEl.innerText = rounds.toString();

    gameElements.style.display = "block";
}

function changeBackground() {
    document.getElementsByTagName("body")[0].style.background = "url('https://picsum.photos/1600/900') fixed center/cover no-repeat";
    document.getElementById("change-bg-btn").style.display = "none";
}

const statsEl = document.getElementById("stats-el");
statsEl.style.display = "none";

const newGameBtn = document.getElementById("new-game-btn");
newGameBtn.style.display = "none";

drawUI();

function drawUI() {
    nextRoundBtn.disabled = true;
    fightBtn.disabled = true;

    userChoiceEl.innerText = "";
    computerChoiceEl.innerText = "";
}

function enableExtendedGameMode() {
    choices.set("lizard", {beats: ["paper", "spock"]});
    choices.set("spock", {beats: ["rock", "scissors"]});

    let extendedGameModeElements = document.getElementsByClassName("extended-game-mode");
    for (element of extendedGameModeElements) {
        element.style.display = "inline";
    }

    document.getElementById("extended-game-mode-btn").style.display = "none";

}

function enableClassicGameMode() {
    choices.delete("lizard");
    choices.delete("spock");

    let extendedGameModeElements = document.getElementsByClassName("extended-game-mode");
    for (element of extendedGameModeElements) {
        element.style.display = "none";
    }

    document.getElementById("extended-game-mode-btn").style.display = "inline";

    if (user.choice === "lizard" || user.choice === "spock") {
        user.choice = null;
        fightBtn.disabled = true;
        userChoiceEl.innerText = "";
    }
}

function userChoose(choice) {
    user.choice = choice;
    updateUserGUI(choice);
}

function updateUserGUI(choice) {
    userChoiceEl.innerText = choice;
    document.getElementById("fight-btn").disabled = false;
}

function getRandomChoice(choices) {
    let values = Array.from(choices);
    return values[Math.floor(Math.random() * values.length)][0];
}

function fight() {
    document.getElementById("fight-btn").disabled = true;

    computer.choice = getRandomChoice(choices);
    computerChoiceEl.innerText = "Computer chooses: " + computer.choice;

    if (choices.get(user.choice).beats.includes(computer.choice))
        computer.alive = false;
    if (choices.get(computer.choice).beats.includes(user.choice))
        user.alive = false;

    let winnerEl = document.getElementById("winner-el");
    if (computer.alive && user.alive) {
        winnerEl.innerText = "Draw!";
        draws++;
    } else {
        if (computer.alive) {
            winnerEl.innerText = "Computer wins!";
            computer.wins++;
        }
        if (user.alive) {
            winnerEl.innerText = "User wins!";
            user.wins++;
        }
    }
    rounds--;

    if (rounds > 0) {
        nextRoundBtn.disabled = false;
    } else {
        let gameOverEl = document.getElementById("game-over-el");
        if (user.wins > computer.wins) {
            gameOverEl.innerText = "Game over! User has won!";
        } else if (computer.wins > user.wins) {
            gameOverEl.innerText = "Game over! Computer has won!";
        } else {
            gameOverEl.innerText = "Gamer over! It's a tie! 👔";
        }
        newGameBtn.style.display = "";
    }
    roundsEl.innerText = rounds.toString();

    statsEl.style.display = "";

    const userWinsEl = document.getElementById("user-wins-el");
    const computerWinsEl = document.getElementById("computer-wins-el");
    const drawsEl = document.getElementById("draws-el");

    userWinsEl.innerText = user.wins;
    computerWinsEl.innerText = computer.wins;
    drawsEl.innerText = draws.toString();

    disableChoices(true);
}

function disableChoices(boolean) {
    for (let el of document.getElementsByClassName("choices")[0].children) {
        el.disabled = boolean;
    }
    for (let el of document.getElementsByClassName("modes")[0].children) {
        el.disabled = boolean;
    }
}

function nextRound() {
    drawUI();

    user.alive = true;
    computer.alive = true;

    disableChoices(false);
}

// console.log(choices.get("rock").beats);