const CELL_BORDER_WIDTH_PERCENTAGE: number = 0.03
const CELL_TEXT_SIZE_PERCENTAGE: number = 0.5

const table: HTMLTableElement = document.getElementById('boardTable') as HTMLTableElement

function updateCellBorderWidth(): void {
    const borderWidth: number = (parseFloat(getComputedStyle(table).width) * CELL_BORDER_WIDTH_PERCENTAGE) / 3
    document.documentElement.style.setProperty('--cellBorderWidth', `${borderWidth}px`)
}

function updateCellTextSize(): void {
    const textSize: number = (parseFloat(getComputedStyle(table).width) * CELL_TEXT_SIZE_PERCENTAGE) / 3
    document.documentElement.style.setProperty('--cellTextSize', `${textSize}px`)
}

function updateSizeProperties(): void {
    updateCellBorderWidth()
    updateCellTextSize()
}

window.addEventListener('resize', updateSizeProperties)
updateSizeProperties()
