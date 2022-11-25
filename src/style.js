"use strict";
const CELL_BORDER_WIDTH_PERCENTAGE = 0.03;
const CELL_TEXT_SIZE_PERCENTAGE = 0.5;
const table = document.getElementById('boardTable');
function updateCellBorderWidth() {
    const borderWidth = (parseFloat(getComputedStyle(table).width) * CELL_BORDER_WIDTH_PERCENTAGE) / 3;
    document.documentElement.style.setProperty('--cellBorderWidth', `${borderWidth}px`);
}
function updateCellTextSize() {
    const textSize = (parseFloat(getComputedStyle(table).width) * CELL_TEXT_SIZE_PERCENTAGE) / 3;
    document.documentElement.style.setProperty('--cellTextSize', `${textSize}px`);
}
function updateSizeProperties() {
    updateCellBorderWidth();
    updateCellTextSize();
}
window.addEventListener('resize', updateSizeProperties);
updateSizeProperties();
