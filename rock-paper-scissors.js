let userDisplay = document.getElementById("your-choice-display");
let computerDisplay = document.getElementById("computer-choice-display");
let resultDisplay = document.getElementById("result-display");
let userScoreDisplay = document.getElementById("yourScore");
let computerScoreDisplay = document.getElementById("computerScore");
let playAgainButton = document.getElementById("play-again");

let userScore = 0;
let computerScore = 0;
let roundsPlayed = 0;

function getCompChoice() {
    const choices = ["Rock", "Paper", "Scissors"];
    return choices[Math.floor(Math.random() * 3)];
}

function getUserChoice(userChoice) {
    return userChoice;
}

function playRound(userChoice, computerChoice) {
    if (roundsPlayed >= 5) {
        return;
    }

    let result = "";

    if (userChoice === computerChoice) {
        result = "IT'S A TIE!";
    } else {
        switch (userChoice) {
            case "Rock":
                result = computerChoice === "Scissors" ? "You win! Rock beats Scissors" : "You lose! Paper beats Rock";
                break;
            case "Paper":
                result = computerChoice === "Rock" ? "You win! Paper beats Rock" : "You lose! Scissors beats Paper";
                break;
            case "Scissors":
                result = computerChoice === "Paper" ? "You win! Scissors beats Paper" : "You lose! Rock beats Scissors";
                break;
        }
    }

    userDisplay.textContent = `Your Choice: ${userChoice}`;
    computerDisplay.textContent = `Computer's Choice: ${computerChoice}`;

    resultDisplay.classList.remove("green-text", "red-text", "yellow-text");
    resultDisplay.textContent = result;

    if (result.startsWith("You win!")) {
        resultDisplay.classList.add("green-text");
        userScore++;
        userScoreDisplay.textContent = `Your Score: ${userScore}`;
    } else if (result.startsWith("You lose!")) {
        resultDisplay.classList.add("red-text");
        computerScore++;
        computerScoreDisplay.textContent = `Computer's Score: ${computerScore}`;
    } else {
        resultDisplay.classList.add("yellow-text");
    }

    roundsPlayed++;

    if (roundsPlayed >= 5) {
        let finalResult = "";
        resultDisplay.classList.remove("green-text", "red-text", "yellow-text");

        if (userScore > computerScore) {
            finalResult = "Game Over! You win! Play again?";
            resultDisplay.classList.add("green-text");
        } else if (computerScore > userScore) {
            finalResult = "Game Over! Computer wins! Play again?";
            resultDisplay.classList.add("red-text");
        } else {
            finalResult = "Game Over! It's a tie! Play again?";
            resultDisplay.classList.add("yellow-text");
        }

        resultDisplay.textContent = finalResult;

        if (playAgainButton) {
            playAgainButton.style.display = "inline-block";
        }
    }
}

function handleButtonClick(choice) {
    const userSelection = getUserChoice(choice);
    const computerSelection = getCompChoice();
    playRound(userSelection, computerSelection);
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    roundsPlayed = 0;

    userScoreDisplay.textContent = "Your Score: 0";
    computerScoreDisplay.textContent = "Computer's Score: 0";
    resultDisplay.textContent = "";
    resultDisplay.classList.remove("green-text", "red-text", "yellow-text");
    userDisplay.textContent = "Your Choice: ";
    computerDisplay.textContent = "Computer's Choice: ";

    if (playAgainButton) {
        playAgainButton.style.display = "none";
    }
}

if (playAgainButton) {
    playAgainButton.style.display = "none";
    playAgainButton.addEventListener("click", resetGame);
}