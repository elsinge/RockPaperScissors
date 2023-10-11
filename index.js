const choices = new Map([
    ["rock",
        {
            beats: ["scissors", "lizard"]
        }
    ],
    ["paper",
        {
            beats: ["rock", "spock"]
        }
    ],
    ["scissors",
        {
            beats: ["paper", "lizard"]
        }
    ]
]);

let rounds = Number(prompt("How many rounds?"));
console.log("rounds=" + rounds);
/*let extendedGameMode = false;
if (extendedGameMode) {
    choices.set("lizard", {beats: ["paper", "spock"]});
    choices.set("spock", {beats: ["rock", "scissors"]});
}*/
let draws = 0;
let nextRoundBtn = document.getElementById("next-round-btn");
let fightBtn = document.getElementById("fight-btn");
let userChoiceEl = document.getElementById("user-choice-el");
let computerChoiceEl = document.getElementById("computer-choice-el");

let computer = {
    alive: true,
    choice: null,
    wins: 0
};
let user = {
    alive: true,
    choice: null,
    wins: 0
};

let roundsEl = document.getElementById("rounds-el");
roundsEl.innerText = rounds.toString();

let statsEl = document.getElementById("stats-el");
statsEl.style.display = "none";

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

function userChoose(choice){
    user.choice = choice;
    updateUserGUI(choice);
}

function updateUserGUI(choice){
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
    }
    roundsEl.innerText = rounds.toString();

    statsEl.style.display = "table";

    let userWinsEl = document.getElementById("user-wins-el");
    let computerWinsEl = document.getElementById("computer-wins-el");
    let drawsEl = document.getElementById("draws-el");

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