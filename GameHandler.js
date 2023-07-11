
function getComputerChoice(){
    let choices = ["rock", "paper", "scissors"];
    // Return random Int [0-3] corresponding to choice
    return choices[Math.floor(Math.random() * 3)];
}

function getPlayerChoice() {
    let choice = prompt("Rock, Paper, or Scissors?");

    do {
        if (choice === "rock" || choice === "paper" || choice === "scissors")
            break;

        choice = prompt("Invalid choice. Rock, Paper, or Scissors?");

        if (choice !== null && choice !== "")
            choice = choice.toLowerCase();

    } while (choice !== "rock" && choice !== "paper" && choice !== "scissors");

    return choice;
}

function playRound(playerSelection, computerSelection) {
    // Rock beats scissors
    // Scissors beats Paper
    // Paper beats rock

    console.log("Computer chose: " + computerSelection + " and Player chose: " + playerSelection + "\n");

    if (computerSelection === playerSelection)
        return "Draw!";

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