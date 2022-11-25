import { playClickAudio, playTieAudio, playWinAudio } from './audio.js';
const statusText = document.getElementById('statusText');
const winCountText = document.getElementById('winCountText');
const winLine = document.getElementById('winLine');
const PLAYER_O_COLOR = `#faf`;
const PLAYER_X_COLOR = `#0fa`;
const TIE_COLOR = `#ffa`;
const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
const winLineTypes = ['R1', 'R2', 'R3', 'C1', 'C2', 'C3', 'D1', 'D2'];
let turn = 'O';
let cells;
let board = new Array(9);
let cellsFilled = 0;
let xWinCount = 0;
let oWinCount = 0;
let tieCount = 0;
let inputBlocked = false;
function initBoard() {
    inputBlocked = false;
    cellsFilled = 0;
    updateTurnText();
    updateWinCountText();
    updateCssTurnVariable();
    winLine.removeAttribute('type');
    if (!cells) {
        cells = Array.from(document.querySelectorAll('#boardContainer td'));
        cells.forEach((cell, i) => {
            cell.addEventListener('click', () => onCellClick(cell, i));
        });
    }
    cells.forEach((cell, i) => {
        cell.removeAttribute('sign');
        cell.textContent = '';
        board[i] = false;
    });
}
function getPlayerColor(player) {
    if (player === 'O')
        return PLAYER_O_COLOR;
    return PLAYER_X_COLOR;
}
function updateTurnText() {
    statusText.innerHTML = `Turn: <span style="font-weight: bold; color: ${getPlayerColor(turn)}">${turn}</span>`;
}
function updateWinCountText() {
    winCountText.innerHTML = `<span style="font-weight: bold; color: ${PLAYER_O_COLOR}">O</span> wins: ${oWinCount}<br>`;
    winCountText.innerHTML += `<span style="font-weight: bold; color: ${PLAYER_X_COLOR}">X</span> wins: ${xWinCount}<br>`;
    winCountText.innerHTML += `<span style="font-weight: bold; color: ${TIE_COLOR}">/</span> ties: ${tieCount}`;
}
function flipTurn() {
    turn = turn == 'O' ? 'X' : 'O';
    updateTurnText();
}
function updateCssTurnVariable() {
    if (inputBlocked) {
        document.documentElement.style.setProperty('--turn', '');
    }
    else {
        document.documentElement.style.setProperty('--turn', JSON.stringify(turn));
    }
}
function setWinLineType(idx) {
    winLine.setAttribute('type', winLineTypes[idx]);
}
function checkWinner() {
    let i = 0;
    for (let combo of combos) {
        let [a, b, c] = combo;
        if (board[a] !== false && board[a] === board[b] && board[b] === board[c]) {
            setWinLineType(i);
            return board[a];
        }
        ++i;
    }
    return false;
}
function onCellClick(cell, idx) {
    if (inputBlocked || board[idx] !== false)
        return;
    board[idx] = turn;
    cell.setAttribute('sign', turn ? turn : '');
    playClickAudio();
    flipTurn();
    const winner = checkWinner();
    if (winner)
        onWin(winner);
    else if (++cellsFilled == 9)
        onTie();
    updateCssTurnVariable();
}
function scheduleRestart() {
    inputBlocked = true;
    setTimeout(initBoard, 3000);
}
function onWin(winner) {
    if (winner === 'X')
        xWinCount++;
    else
        oWinCount++;
    updateWinCountText();
    playWinAudio();
    scheduleRestart();
    statusText.innerHTML = `<span style="font-weight: bold; color: ${getPlayerColor(winner)}">${winner}</span> wins!`;
}
function onTie() {
    tieCount++;
    updateWinCountText();
    playTieAudio();
    scheduleRestart();
    statusText.innerHTML = `It's a <span style="font-weight: bold; color: ${TIE_COLOR}">/ tie</span>!`;
}
initBoard();
document.documentElement.style.setProperty('--xPlayerColor', PLAYER_X_COLOR);
document.documentElement.style.setProperty('--oPlayerColor', PLAYER_O_COLOR);
