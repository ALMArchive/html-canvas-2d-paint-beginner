/*
    Utility Functions
 */
function pixelStringToNumber(num) {
    if(!num) return;
    return parseInt(num.replace('px', ''));
}

function resizeCanvas(canvas, width, height) {
    if(!canvas || !width || !height) return;
    canvas.width = width;
    canvas.height = height;
}

/*
    Style Functions
 */
function setFillStyle(ctx, r, g, b, a = 1.0) {
    if(!ctx) return;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
}

function setStrokeStyle(ctx, r, g, b, a = 1.0) {
    if(!ctx) return;
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
}

const canvas = document.getElementById('paint-canvas');

const width = pixelStringToNumber(window.getComputedStyle(canvas).width);
const height = pixelStringToNumber(window.getComputedStyle(canvas).height);

resizeCanvas(canvas, width, height);

if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    setFillStyle(ctx, 200, 0, 0);
    ctx.fillRect(10, 10, 50, 50);

    setFillStyle(ctx, 0, 0, 200, 0.5);
    ctx.fillRect(30, 30, 50, 50);
}
