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

let extendedGameMode = false;
if (extendedGameMode) {
    choices.set("lizard", {beats: ["paper", "spock"]});
    choices.set("spock", {beats: ["rock", "scissors"]});
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
}

let computer = {
    alive: true,
    choice: null
};
let user = {
    alive: true,
    choice: null
};

function choose(player, choice) {
    player.choice = choice;
}

function userChoose(choice){
    choose(user, choice);
    updateUserGUI(choice);
}

function updateUserGUI(choice){
    let userChoiceEl = document.getElementById("user-choice-el");
    userChoiceEl.innerText = choice;
    document.getElementById("fight-btn").disabled = false;
}

function getRandomChoice(choices) {
    let values = Array.from(choices);
    return values[Math.floor(Math.random() * values.length)][0];
}
function fight() {
    document.getElementById("fight-btn").disabled = true;

    choose(computer, getRandomChoice(choices));
    let computerChoiceEl = document.getElementById("computer-choice-el");
    computerChoiceEl.innerText = "Computer chooses: " + computer.choice;

    if (choices.get(user.choice).beats.includes(computer.choice))
        computer.alive = false;
    if (choices.get(computer.choice).beats.includes(user.choice))
        user.alive = false;

    let winnerEl = document.getElementById("winner-el");
    if (computer.alive && user.alive) {
        winnerEl.innerText = "Draw!";
    } else {
        if (computer.alive) winnerEl.innerText = "Computer wins!";
        if (user.alive) winnerEl.innerText = "User wins!";
    }
}

// console.log(choices.get("rock").beats);