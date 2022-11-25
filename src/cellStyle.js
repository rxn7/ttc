"use strict";
const CELL_BORDER_WIDTH_PERCENTAGE = 0.01;
const table = document.getElementById('boardTable');
function updateCellBorderWidth() {
    const borderWidth = parseFloat(getComputedStyle(table).width) * CELL_BORDER_WIDTH_PERCENTAGE;
    document.documentElement.style.setProperty('--cellBorderWidth', `${borderWidth}px`);
}
window.addEventListener('resize', updateCellBorderWidth);
updateCellBorderWidth();
