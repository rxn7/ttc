const gridContainer: HTMLDivElement = document.getElementById('gridContainer') as HTMLDivElement
const turnText: HTMLParagraphElement = document.getElementById('turnText') as HTMLParagraphElement
const winCountText: HTMLParagraphElement = document.getElementById('winCountText') as HTMLParagraphElement

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
let buttons: HTMLButtonElement[]
let grid: Player[]
let btnClickCounter: number = 0
let xWins: number = 0
let oWins: number = 0

function initGrid(): void {
    updateTurnText()
    updateWinCountText()

    btnClickCounter = 0
    buttons && buttons.forEach((el) => gridContainer.removeChild(el))

    grid = new Array<Player>(9)
    buttons = new Array<HTMLButtonElement>(9)
    for (let i: number = 0; i < 9; ++i) {
        const btn = document.createElement('button')
        btn.addEventListener('click', () => onBtnClick(i))
        btn.classList.add('gridBtn')

        buttons[i] = btn
        gridContainer.appendChild(btn)
        grid[i] = false
    }
}

function updateTurnText(): void {
    turnText.textContent = `Turn: ${turn}`
}

function updateWinCountText(): void {
    winCountText.innerHTML = `O wins: ${oWins}<br>X wins: ${xWins}`
}

function flipTurn(): void {
    turn = turn == 'O' ? 'X' : 'O'
    updateTurnText()
}

function checkWinner(): Player {
    for (let combo of combos) {
        let [a, b, c] = combo
        if (grid[a] !== false && grid[a] === grid[b] && grid[b] === grid[c]) return grid[a]
    }

    return false
}

function onBtnClick(idx: number): void {
    grid[idx] = turn

    const btn = buttons[idx]
    btn.textContent = turn ? turn : ' '
    btn.disabled = true
    btn.classList.add(`gridBtn${turn}`)

    flipTurn()

    const winner: Player = checkWinner()
    if (winner) {
        alert(`Player ${winner} has won!`)

        if (winner === 'X') xWins++
        else oWins++

        initGrid()
    }

    if (++btnClickCounter == 9) {
        alert(`No one wins!`)
        initGrid()
    }
}

initGrid()
