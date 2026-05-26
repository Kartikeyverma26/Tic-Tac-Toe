const board = document.getElementById("board");
const statusText = document.getElementById("status");

const humanScoreEl = document.getElementById("humanScore");
const computerScoreEl = document.getElementById("computerScore");

let humanScore = 0;
let computerScore = 0;

let cells = [];
let currentPlayer = "X"; // Human = X
let gameActive = true;

function createBoard() {
  board.innerHTML = "";
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;

    cell.addEventListener("click", handleHumanMove);

    board.appendChild(cell);
    cells.push(cell);
  }

  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Your turn (X)";
}

function handleHumanMove(e) {
  const cell = e.target;

  if (!gameActive || cell.textContent !== "") return;

  cell.textContent = "X";

  if (checkWinner("X")) {
    humanScore++;
    updateScore();
    statusText.textContent = "You Win 🎉";
    gameActive = false;
    return;
  }

  if (isDraw()) {
    statusText.textContent = "Draw 😐";
    gameActive = false;
    return;
  }

  statusText.textContent = "Computer thinking...";
  setTimeout(computerMove, 500);
}

function computerMove() {
  if (!gameActive) return;

  let emptyCells = cells.filter(c => c.textContent === "");

  if (emptyCells.length === 0) return;

  // simple AI: random move
  let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  move.textContent = "O";

  if (checkWinner("O")) {
    computerScore++;
    updateScore();
    statusText.textContent = "Computer Wins 🤖";
    gameActive = false;
    return;
  }

  if (isDraw()) {
    statusText.textContent = "Draw 😐";
    gameActive = false;
    return;
  }

  statusText.textContent = "Your turn (X)";
}

function checkWinner(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winPatterns.some(pattern => {
    return pattern.every(i => cells[i].textContent === player);
  });
}

function isDraw() {
  return cells.every(c => c.textContent !== "");
}

function updateScore() {
  humanScoreEl.textContent = humanScore;
  computerScoreEl.textContent = computerScore;
}

function resetGame() {
  createBoard();
}

createBoard();