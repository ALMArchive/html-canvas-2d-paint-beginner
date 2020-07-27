/*
    Utility Functions
 */
// utils
function pixelStringToNumber(num) {
    if(!num) return;
    return parseInt(num.replace('px', ''));
}

function resizeCanvas(canvas, width, height) {
    if(!canvas || !width || !height) return;
    canvas.width = width;
    canvas.height = height;
}

const canvas = document.getElementById('paint-canvas');

const width = pixelStringToNumber(window.getComputedStyle(canvas).width);
const height = pixelStringToNumber(window.getComputedStyle(canvas).height);

resizeCanvas(canvas, width, height);

if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
}
