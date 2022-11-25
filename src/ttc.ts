import { playClickAudio, playTieAudio, playWinAudio } from './audio.js'
import './style.js'

type Player = 'X' | 'O' | false

const statusText: HTMLParagraphElement = document.getElementById('statusText') as HTMLParagraphElement
const winCountText: HTMLParagraphElement = document.getElementById('winCountText') as HTMLParagraphElement
const winningComboLine: HTMLDivElement = document.getElementById('winningComboLine') as HTMLDivElement

const PLAYER_O_COLOR: string = `#faf`
const PLAYER_X_COLOR: string = `#0fa`
const TIE_COLOR: string = `#ffa`

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

const winLineTypes: string[] = ['R1', 'R2', 'R3', 'C1', 'C2', 'C3', 'D1', 'D2']

let turn: Player = 'O'
let cells: HTMLTableCellElement[]
let board: Player[] = new Array<Player>(9)
let cellsFilled: number = 0

let score = {
    O: 0,
    X: 0,
    tie: 0,
}

let inputBlocked: boolean = false

function initBoard(): void {
    inputBlocked = false
    cellsFilled = 0

    updateTurnText()
    updateWinCountText()
    updateCssTurnVariable()
    winningComboLine.removeAttribute('type')

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
    statusText.innerHTML = `Turn: <span style="font-weight: bold; color: ${getPlayerColor(turn)}">${turn}</span>`
}

function updateWinCountText(): void {
    winCountText.innerHTML = `<span style="font-weight: bold; color: ${PLAYER_O_COLOR}">O</span> wins: ${score.O}<br>`
    winCountText.innerHTML += `<span style="font-weight: bold; color: ${PLAYER_X_COLOR}">X</span> wins: ${score.X}<br>`
    winCountText.innerHTML += `<span style="font-weight: bold; color: ${TIE_COLOR}">/</span> ties: ${score.tie}`
}

function flipTurn(): void {
    turn = turn == 'O' ? 'X' : 'O'
    updateTurnText()
}

function updateCssTurnVariable() {
    if (inputBlocked) {
        document.documentElement.style.setProperty('--turn', '')
    } else {
        /* for some reason it doesnt work when it's 'turn as string' or just 'turn' */
        document.documentElement.style.setProperty('--turn', JSON.stringify(turn))
    }
}

function setWinLineType(idx: number) {
    winningComboLine.setAttribute('type', winLineTypes[idx])
}

function checkWinner(): Player {
    let i: number = 0
    for (let combo of combos) {
        let [a, b, c] = combo
        if (board[a] !== false && board[a] === board[b] && board[b] === board[c]) {
            setWinLineType(i)
            return board[a]
        }

        ++i
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
    else if (++cellsFilled == 9) onTie()

    updateCssTurnVariable()
}

function scheduleRestart(): void {
    inputBlocked = true
    setTimeout(initBoard, 3000)
}

function onWin(winner: Player): void {
    if (!winner) return

    score[winner]++

    updateWinCountText()
    playWinAudio()
    scheduleRestart()

    statusText.innerHTML = `<span style="font-weight: bold; color: ${getPlayerColor(winner)}">${winner}</span> wins!`
}

function onTie(): void {
    score.tie++

    updateWinCountText()
    playTieAudio()
    scheduleRestart()

    statusText.innerHTML = `It's a <span style="font-weight: bold; color: ${TIE_COLOR}">/ tie</span>!`
}

document.documentElement.style.setProperty('--xPlayerColor', PLAYER_X_COLOR)
document.documentElement.style.setProperty('--oPlayerColor', PLAYER_O_COLOR)

cells = Array.from(document.querySelectorAll('#boardContainer td'))
cells.forEach((cell, i) => {
    cell.addEventListener('click', () => onCellClick(cell, i))
})

initBoard()
