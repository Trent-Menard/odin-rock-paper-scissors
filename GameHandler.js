
document.getElementById("ButtonChoiceRock").addEventListener("click", () => playRound("rock", getComputerChoice()));
document.getElementById("ButtonChoicePaper").addEventListener("click", () => playRound("paper", getComputerChoice()));
document.getElementById("ButtonChoiceScissors").addEventListener("click", () => playRound("scissors", getComputerChoice()));

const divElement = document.createElement("div");
divElement.setAttribute("id", "ResultsDiv");
document.body.appendChild(divElement);

const gameText = "I want to play a game.";

for (i = 1; i <=3; i++){
    const gameTextElement = document.createElement("h1");
    gameTextElement.setAttribute("id", "GameText" + i);
    const gameTextElementData = document.getElementById("GameText" + i);

    // setTimeout(() => {
    //     for (j = 0; j <=5; j++){
    //         console.log(j);
    //     }
    // }, 5000);

    document.body.append(gameTextElement);
}

function getComputerChoice(){
    let choices = ["rock", "paper", "scissors"];
    // Return random Int [0-3] corresponding to choice
    return choices[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {

    console.log("Computer chose: " + computerSelection + " and Player chose: " + playerSelection + "\n");

    if (computerSelection === playerSelection)
        return "Draw!";

    // Rock beats scissors
    // Scissors beats Paper
    // Paper beats rock

    else if (computerSelection === "rock" && playerSelection !== "paper" ||
        computerSelection === "paper" && playerSelection !== "scissors" ||
        computerSelection === "scissors" && playerSelection !== "rock")
        return "Computer wins!";

    return "Player wins!";
}

// Call in Console to begin game
function game() {
    let playerWins = 0;
    for (let i = 1;  i <= 5; i++){
        let roundResult = playRound(getComputerChoice(), getPlayerChoice());
        if (roundResult === "Player wins!")
            playerWins++;
        console.log("Round " + i + ": " + roundResult + "\n\n");
    }
    console.log("\nYou won " + playerWins + " games!")
}