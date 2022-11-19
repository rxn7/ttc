import { playClickAudio, playTieAudio, playWinAudio } from './audio.js';
const turnText = document.getElementById('turnText');
const winCountText = document.getElementById('winCountText');
const PLAYER_O_COLOR = `#faf`;
const PLAYER_X_COLOR = `#0fa`;
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
let turn = 'O';
let cells;
let board = new Array(9);
let btnClickCounter = 0;
let xWinCount = 0;
let oWinCount = 0;
let tieCount = 0;
let inputBlocked = false;
function initBoard() {
    updateTurnText();
    updateWinCountText();
    inputBlocked = false;
    btnClickCounter = 0;
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
    turnText.innerHTML = `Turn: <span style="font-weight: bold; color: ${getPlayerColor(turn)}">${turn}</span>`;
}
function updateWinCountText() {
    winCountText.innerHTML = `<span style="font-weight: bold; color: ${PLAYER_O_COLOR}">O</span> wins: ${oWinCount}<br>`;
    winCountText.innerHTML += `<span style="font-weight: bold; color: ${PLAYER_X_COLOR}">X</span> wins: ${xWinCount}<br>`;
    winCountText.innerHTML += `ties: ${tieCount}`;
}
function flipTurn() {
    turn = turn == 'O' ? 'X' : 'O';
    updateTurnText();
}
function checkWinner() {
    for (let combo of combos) {
        let [a, b, c] = combo;
        if (board[a] !== false && board[a] === board[b] && board[b] === board[c])
            return board[a];
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
    else if (++btnClickCounter == 9)
        onTie();
}
function onWin(winner) {
    if (winner === 'X')
        xWinCount++;
    else
        oWinCount++;
    updateWinCountText();
    turnText.innerHTML = `<span style="font-weight: bold; color: ${getPlayerColor(winner)}">${winner}</span> wins!`;
    inputBlocked = true;
    playWinAudio();
    setTimeout(initBoard, 3000);
}
function onTie() {
    tieCount++;
    updateWinCountText();
    turnText.textContent = `It's a tie!`;
    inputBlocked = true;
    playTieAudio();
    setTimeout(initBoard, 3000);
}
initBoard();
document.documentElement.style.setProperty('--xPlayerColor', PLAYER_X_COLOR);
document.documentElement.style.setProperty('--oPlayerColor', PLAYER_O_COLOR);
