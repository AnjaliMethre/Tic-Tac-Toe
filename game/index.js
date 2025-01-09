const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restart-button');

let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Start game
function startGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
        cell.addEventListener('click', handleClick, { once: true });
    });
    winnerMessage.textContent = '';
    currentPlayer = 'X';
    gameActive = true;
}

// Handle cell click
function handleClick(e) {
    if (!gameActive) return;

    const cell = e.target;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

// Check for win
function checkWin(player) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

// Check for draw
function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

// End game
function endGame(draw) {
    gameActive = false;
    if (draw) {
        winnerMessage.textContent = "It's a draw!";
    } else {
        winnerMessage.textContent = `${currentPlayer} wins!`;
    }
}

// Swap turns
function swapTurns() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Restart game
restartButton.addEventListener('click', startGame);

// Initialize game
startGame();
