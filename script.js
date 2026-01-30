"use strict";

const choicebuttons = document.querySelectorAll(".choice");
const playerChoiceText = document.querySelector(".player_choice");
const computerChoiceText = document.querySelector(".computer_choice");

const messageText = document.querySelector(".message");

const playerScoreText = document.querySelector(".player_score");
const computerScoreText = document.querySelector(".computer_score");
const tieScoreText = document.querySelector(".tie_score");
const maxPlay = document.querySelector(".max_rounds");

const resetBtn = document.querySelector(".reset");

const winSound = new Audio("sounds/win.mp3");
const loseSound = new Audio("sounds/lose.mp3");
const tieSound = new Audio("sounds/tie.mp3");

let playerScore = 0;
let computerScore = 0;
let tieScore = 0;

const winningScore = 3;
let roundsPlayed = 0;
const maxAttempts = 5;

let gameOver = false;

const choices = ["rock", "paper", "scissors"];

// computer choice function
function getcomputerChoice() {
  const computerRandomChoice = Math.floor(Math.random() * choices.length);
  return choices[computerRandomChoice];
}
console.log(getcomputerChoice());

// game function
function game(player, computer) {
  if (player === computer) return "tie";

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) {
    return "win";
  } else {
    return "lose";
  }
}

// result/score function
function updateGame(result) {
  if (result === "win") {
    playerScore++;
    messageText.textContent = "🎉 you win!!!";
  } else if (result === "lose") {
    computerScore++;
    messageText.textContent = "you lose 😡";
  } else {
    tieScore++;
    messageText.textContent = "its a tie";
  }

  playerScoreText.textContent = playerScore;
  computerScoreText.textContent = computerScore;
  tieScoreText.textContent = tieScore;
}

// winner function
function endgame() {
  if (playerScore > computerScore) {
    winSound.play();
    messageText.textContent = "🎉 you won the game";
  } else if (computerScore > playerScore) {
    messageText.textContent = "😡 computer won the game";
    loseSound.play();
  } else {
    messageText.textContent = "😆 its a tie";
    tieSound.play();
  }
  gameOver = true;
}

// buttons click
choicebuttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (gameOver) return;

    const playerChoice = button.dataset.choice;
    const computerChoice = getcomputerChoice();

    playerChoiceText.textContent = playerChoice;
    computerChoiceText.textContent = computerChoice;

    const result = game(playerChoice, computerChoice);
    updateGame(result);

    roundsPlayed++;
    maxPlay.textContent = roundsPlayed;
    console.log(roundsPlayed);

    // endgame();
    if (roundsPlayed === maxAttempts) {
      endgame();
    }
  });
});

// restart the game
resetBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  tieScore = 0;
  roundsPlayed = 0;

  gameOver = false;

  playerScoreText.textContent = 0;
  computerScoreText.textContent = 0;
  tieScoreText.textContent = 0;

  playerChoiceText.textContent = "_";
  computerChoiceText.textContent = "_";
  messageText.textContent = "play again";
});
