
playWelcomeMsg();

function playWelcomeMsg() {
    const gameText = "I want to play a game.";
    const gameText2 = "5 Rounds. Live or die, make your choice.";

    // Create 3 h1 elements in format: GameText#
    for (let i = 1; i <= 5; i++) {
        const gameTextElement = document.createElement("h1");
        gameTextElement.setAttribute("id", "GameText" + i);
        gameTextElement.setAttribute("class", "GameText");
        document.getElementsByTagName("main")[0].append(gameTextElement);
    }

    animateGameText(gameText, 0, 5, document.getElementById("GameText1"), 100);

    setTimeout(() => {
        animateGameText(gameText, 7, 13, document.getElementById("GameText2"), 100);
    }, 500);

    setTimeout(() => {
        animateGameText(gameText, 15, 21, document.getElementById("GameText3"), 100);
    }, 1200);

    setTimeout(() => {
        document.getElementById("GameText1").remove();
        document.getElementById("GameText2").remove();
        document.getElementById("GameText3").remove();

        animateGameText(gameText2, 0, 8, document.getElementById("GameText4"), 100);

    }, 2500);

    setTimeout(() => {
        animateGameText(gameText2, 10, 39, document.getElementById("GameText4"), 100);
    }, 4000);

    setTimeout(() => {
        generateStartButton();
    }, 7500);

}

function generateStartButton(){
        let divElement = document.createElement("div");
        divElement.setAttribute("id", "buttonsDiv");
        document.getElementsByTagName("main")[0].append(divElement);

        let startButton = document.createElement("button");
        startButton.setAttribute("id", "ButtonStart");
        startButton.textContent = "Start Game";
        document.getElementById("buttonsDiv").append(startButton);

        document.getElementById("ButtonStart").addEventListener("click", () => {
            document.getElementById("buttonsDiv").removeChild(document.getElementById("ButtonStart"));

            document.getElementById("GameText4").remove();
            document.getElementById("GameText5").remove();

            generateChoiceButtons();
        });
}

function generateChoiceButtons() {
    let buttonChoiceRock = document.createElement("button");
    buttonChoiceRock.setAttribute("id", "ButtonChoiceRock");
    document.getElementById("buttonsDiv").append(buttonChoiceRock);
    document.getElementById("ButtonChoiceRock").addEventListener("click", () => startGame("rock"));

    let buttonChoicePaper = document.createElement("button");
    buttonChoicePaper.setAttribute("id", "ButtonChoicePaper");
    document.getElementById("buttonsDiv").append(buttonChoicePaper);
    document.getElementById("ButtonChoicePaper").addEventListener("click", () => startGame("paper"));


    let buttonChoiceScissors = document.createElement("button");
    buttonChoiceScissors.setAttribute("id", "ButtonChoiceScissors");
    document.getElementById("buttonsDiv").append(buttonChoiceScissors);
    document.getElementById("ButtonChoiceScissors").addEventListener("click", () => startGame("scissors"));
}

function animateGameText(text, textStartIdx, textEndIdx, targetElement, miliSecDelay) {
    let index = textStartIdx;
    let interval;

    interval = setInterval( () => {
        if (index === textEndIdx)
            clearInterval(interval);

        targetElement.textContent += text[index];
        index++;

    }, miliSecDelay);
}

function getComputerChoice(){
    let choices = ["rock", "paper", "scissors"];
    // Return random Int [0-3] corresponding to choice
    return choices[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {

    let resultObj = {
        computer:computerSelection,
        player:playerSelection,
        winner:undefined,
        isDraw:false
    };

    if (computerSelection === playerSelection)
        resultObj.isDraw = true;

    else if (computerSelection === "rock" && playerSelection !== "paper" || // Rock beats scissors
        computerSelection === "paper" && playerSelection !== "scissors" || // Scissors beats Paper
        computerSelection === "scissors" && playerSelection !== "rock") // Paper beats rock
        resultObj.winner = "Computer";

    else resultObj.winner = "Player";

    return resultObj;
}

let playerWins = 0;
let computerWins = 0;
let draws = 0;
let round = 1;
let roundResult;
// Call in Console to begin game
function startGame(playerSelection) {

    // May exceed 5 rounds (draw) so go by when total is 5 (first to); indicates end of game.
    if (playerWins + computerWins ===  5) {
        document.getElementById("buttonsDiv").remove();
        document.getElementById("scoreboardTitle").remove();
        document.getElementById("scoreboardScoreUpdate").remove();
        generateFinalScore();
    }

    else {
        if (round === 1)
            generateScoreboard();

        roundResult = playRound(getComputerChoice(), playerSelection);

        if (!roundResult.isDraw)
            roundResult.winner === "Player" ? playerWins++ : computerWins++;

        updateScoreboard(round, roundResult);

        round++;
    }
}

function generateScoreboard() {

    // <div id = "scoreboardDiv> </div>
    let scoreboardDiv = document.createElement("div");
    scoreboardDiv.setAttribute("id", "scoreboardDiv");
    document.getElementsByTagName("main")[0].append(scoreboardDiv);

    // <h1 id = "scoreboardTitle> </h1>
    let scoreboardTitleElement = document.createElement("h1");
    scoreboardTitleElement.setAttribute("id", "scoreboardTitle");
    document.getElementById("scoreboardDiv").append(scoreboardTitleElement);

    // <h3 id = "scoreboardScoreUpdate> </h3>
    let scoreboardScoreUpdateElement = document.createElement("h3");
    scoreboardScoreUpdateElement.setAttribute("id", "scoreboardScoreUpdate");
    document.getElementById("scoreboardDiv").appendChild(scoreboardScoreUpdateElement);
}

function updateScoreboard(round, roundResult) {
    document.getElementById("scoreboardTitle").textContent = "Round " + round + ":";
    if (!roundResult.isDraw) {
        if (roundResult.winner === "Player")
            document.getElementById("scoreboardScoreUpdate").textContent = roundResult.player + " beats " + roundResult.computer;
        else
            document.getElementById("scoreboardScoreUpdate").textContent = roundResult.computer + " beats " + roundResult.player;
    }
    else
        document.getElementById("scoreboardScoreUpdate").textContent = "Draw!";
}

function generateFinalScore() {
    let playerWinsElement = document.createElement("h3");
    playerWinsElement.setAttribute("id", "playerWins");
    playerWinsElement.textContent = "Player won " + playerWins + " / " + round + " rounds.";

    let computerWinsElement = document.createElement("h3");
    computerWinsElement.setAttribute("id", "computerWins");
    computerWinsElement.textContent = "Computer won " + computerWins + " / " + round + " rounds.";

    let drawsElement = document.createElement("h3");
    drawsElement.setAttribute("id", "draws");


    let winnerElement = document.createElement("h2");
    winnerElement.setAttribute("id", "winner");
    playerWins > computerWins ? winnerElement.textContent = "You survived!" : winnerElement.textContent = "You died!";

    // Ideal game lasts 5 rounds, difference is total draws
    draws = round - 5;
    drawsElement.textContent = draws + " draws.";

    document.getElementById("scoreboardDiv").appendChild(winnerElement);
    document.getElementById("scoreboardDiv").appendChild(playerWinsElement);
    document.getElementById("scoreboardDiv").appendChild(computerWinsElement);
    document.getElementById("scoreboardDiv").appendChild(drawsElement);
}