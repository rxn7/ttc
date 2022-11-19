import { playClickAudio, playTieAudio, playWinAudio } from './audio.js'

const turnText: HTMLParagraphElement = document.getElementById('turnText') as HTMLParagraphElement
const winCountText: HTMLParagraphElement = document.getElementById('winCountText') as HTMLParagraphElement

const PLAYER_O_COLOR: string = `greenyellow`
const PLAYER_X_COLOR: string = `red`

const combos: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

type Player = 'X' | 'O' | false

let turn: Player = 'O'
let cells: HTMLTableCellElement[]
let board: Player[] = new Array<Player>(9)
let btnClickCounter: number = 0
let xWinCount: number = 0
let oWinCount: number = 0
let tieCount: number = 0
let inputBlocked: boolean = false

function initBoard(): void {
    updateTurnText()
    updateWinCountText()

    inputBlocked = false
    btnClickCounter = 0

    if (!cells) {
        cells = Array.from(document.querySelectorAll('#boardContainer td'))
        cells.forEach((cell, i) => {
            cell.addEventListener('click', () => onCellClick(cell, i))
        })
    }

    cells.forEach((cell, i) => {
        cell.removeAttribute('sign')
        cell.textContent = ''
        board[i] = false
    })
}

function getPlayerColor(player: Player) {
    if (player === 'O') return PLAYER_O_COLOR

    return PLAYER_X_COLOR
}

function updateTurnText(): void {
    turnText.innerHTML = `Turn: <span style="font-weight: bold; color: ${getPlayerColor(turn)}">${turn}</span>`
}

function updateWinCountText(): void {
    winCountText.innerHTML = `<span style="font-weight: bold; color: ${PLAYER_O_COLOR}">O</span> wins: ${oWinCount}<br>`
    winCountText.innerHTML += `<span style="font-weight: bold; color: ${PLAYER_X_COLOR}">X</span> wins: ${xWinCount}<br>`
    winCountText.innerHTML += `ties: ${tieCount}`
}

function flipTurn(): void {
    turn = turn == 'O' ? 'X' : 'O'
    updateTurnText()
}

function checkWinner(): Player {
    for (let combo of combos) {
        let [a, b, c] = combo
        if (board[a] !== false && board[a] === board[b] && board[b] === board[c]) return board[a]
    }

    return false
}

function onCellClick(cell: HTMLTableCellElement, idx: number): void {
    if (inputBlocked || board[idx] !== false) return

    board[idx] = turn

    cell.setAttribute('sign', turn ? turn : '')

    playClickAudio()
    flipTurn()

    const winner: Player = checkWinner()
    if (winner) onWin(winner)
    else if (++btnClickCounter == 9) onTie()
}

function onWin(winner: Player): void {
    if (winner === 'X') xWinCount++
    else oWinCount++

    updateWinCountText()

    turnText.innerHTML = `<span style="font-weight: bold; color: ${getPlayerColor(winner)}">${winner}</span> wins!`
    inputBlocked = true

    playWinAudio()

    setTimeout(initBoard, 3000)
}

function onTie(): void {
    tieCount++
    updateWinCountText()

    turnText.textContent = `It's a tie!`
    inputBlocked = true

    playTieAudio()

    setTimeout(initBoard, 3000)
}

initBoard()
