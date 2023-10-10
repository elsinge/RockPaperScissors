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

console.log(choices.get("rock").beats)
