/*
    Utility Functions
 */

// converts a string in the form '12px' to an integer
function pixelStringToNumber(num) {
    if(!num) return;
    return parseInt(num.replace('px', ''));
}

// resizes a canvas element to the provided width/height
function resizeCanvas(canvasElement, width, height) {
    if(!canvasElement || !width || !height) return;
    canvasElement.width = width;
    canvasElement.height = height;
}

// convert from degrees to radians
function deg2rad(degrees) {
    return degrees * Math.PI / 180;
}

/*
    Style Functions
 */

// sets the fill style of a given canvas rendering context to the color
// represented by the provided rgba values
function setFillStyle(canvasRenderingContext, r, g, b, a = 1.0) {
    if(!canvasRenderingContext) return;
    canvasRenderingContext.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
}

// sets the stroke style of a given canvas rendering context to the color
// represented by the provided rgba values
function setStrokeStyle(canvasRenderingContext, r, g, b, a = 1.0) {
    if(!canvasRenderingContext) return;
    canvasRenderingContext.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
}

/*
    Drawing Functions
 */

// draws a filled rectangle at point x, y, with dimensions width and height
// to the provided rendering context
function fillRect(canvasRenderingContext, x, y, width, height) {
    if(!canvasRenderingContext) return;
    canvasRenderingContext.fillRect(x, y, width, height);
}

// draws a stroked rectangle at point x, y, with dimensions width and height
// to the provided rendering context
function strokeRect(canvasRenderingContext, x, y, width, height) {
    if(!canvasRenderingContext) return;
    canvasRenderingContext.strokeRect(x, y, width, height);
}

// draws a single pixel at point x, y to the provided rendering context
function drawPixel(canvasRenderingContext, x, y) {
    fillRect(canvasRenderingContext, x, y, 1, 1);
}

// clears a rectangular region at point x, y, with dimensions width and height
// from the provided rendering context
function clearRect(canvasRenderingContext, x, y, w, h) {
    if(!canvasRenderingContext) return;
    canvasRenderingContext.clearRect(x, y, w, h);
}

// clears a single pixel at point x, y from the provided rendering context
function clearPixel(canvasRenderingContext, x, y) {
    clearRect(canvasRenderingContext, x, y, 1, 1);
}

// ellipse helper function that draws the ellipse path to the rendering context but defers it's fill style
function _pathEllipse(canvasRenderingContext, x, y, radiusx, radiusy, rotation, startAngle, endAngle, counterclock = false) {
    if(!canvasRenderingContext) return;
    canvasRenderingContext.beginPath();
    canvasRenderingContext.ellipse(x, y, radiusx, radiusy, rotation, startAngle, endAngle, counterclock);
}

// draws a filled ellipse at point x, y defined by the provided parameters to the provided rendering context
function fillEllipse(canvasRenderingContext, x, y, radiusx, radiusy, rotation, startAngle, endAngle, counterclock = false) {
    if(!canvasRenderingContext) return;
    _pathEllipse(canvasRenderingContext, x, y, radiusx, radiusy, deg2rad(rotation), deg2rad(startAngle), deg2rad(endAngle), counterclock);
    canvasRenderingContext.fill();
}

// draws a stroked ellipse at point x, y defined by the provided parameters to the provided rendering context
function strokeEllipse(canvasRenderingContext, x, y, radiusx, radiusy, rotation, startAngle, endAngle, counterclock = false) {
    if(!canvasRenderingContext) return;
    _pathEllipse(canvasRenderingContext, x, y, radiusx, radiusy, deg2rad(rotation), deg2rad(startAngle), deg2rad(endAngle), counterclock);
    canvasRenderingContext.stroke();
}

// draws a filled arc at point x, y defined by the provided parameters to the provided rendering context
function fillArc(canvasRenderingContext, x, y, radius, startAngle, endAngle, counterclock = false) {
    fillEllipse(canvasRenderingContext, x, y, radius, radius, 0, startAngle, endAngle, counterclock);
}

// draws a stroked arc at point x, y defined by the provided parameters to the provided rendering context
function strokeArc(canvasRenderingContext, x, y, radius, startAngle, endAngle, counterclock = false) {
    strokeEllipse(canvasRenderingContext, x, y, radius, radius, 0, startAngle, endAngle, counterclock);
}

// draws a filled circle at point x, y defined by the provided parameters to the provided rendering context
function fillCircle(canvasRenderingContext, x, y, radius) {
    if(!canvasRenderingContext) return;
    fillArc(canvasRenderingContext, x, y, radius, 0, 360);
}

// draws a stroked circle at point x, y defined by the provided parameters to the provided rendering context
function strokeCircle(canvasRenderingContext, x, y, radius) {
    if(!canvasRenderingContext) return;
    strokeArc(canvasRenderingContext, x, y, radius, 0, 360);
}

// draws a line from x1, y1 to x2, y2 of a specified width to the provided rendering context
function drawLine(canvasRenderingContext, x1, y1, x2, y2, width = 1) {
    if(!canvasRenderingContext) return;
    canvasRenderingContext.beginPath();
    canvasRenderingContext.moveTo(x1, y1);
    canvasRenderingContext.lineTo(x2, y2);
    canvasRenderingContext.lineWidth = width;
    canvasRenderingContext.stroke();
}

/*
    color picker code
 */

const colorViewer = document.getElementById('color-viewer');
const colorPickerPanel = document.getElementById('color-picker-panel');
const colorPickerDisplay = document.getElementById('color-picker-display');

function makeElementVisible(elem) {
    elem.classList.remove('invisible');
}

function makeElementInvisible(elem) {
    elem.classList.add('invisible');
}

const sliderValues = {
    r: 255,
    g: 255,
    b: 255
};

const sliders = Array.from(document.getElementsByClassName('color-slider'));
sliders.map(e => {
    const id = e.id;
    if(id === 'red') {
        e.value = sliderValues.r;
    } else if(id === 'green') {
        e.value = sliderValues.g;
        sliderValues.g = e.value;
    } else if(id === 'blue') {
        e.value = sliderValues.b;
    } else {
        throw 'Invalid id, should be red, green or blue';
    }
    setColorViewerBackgroundFromSliderValues();
    e.addEventListener('input', (e) => {
        updateSliderValuesFromInputEvent(e);
        setColorViewerBackgroundFromSliderValues();
        setColorDisplayBackgroundFromSliderValues();
    });
});

function setElementBackgroundColor(elem, r, g, b) {
    elem.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function setColorViewerBackground(r, g, b) {
    setElementBackgroundColor(colorViewer, r, g, b);
}

function setColorViewerBackgroundFromSliderValues() {
    setColorViewerBackground(sliderValues.r, sliderValues.g, sliderValues.b);
}

function setColorDisplayBackground(r, g, b) {
    setElementBackgroundColor(colorPickerDisplay, r, g, b);
}

function setColorDisplayBackgroundFromSliderValues() {
    setColorDisplayBackground(sliderValues.r, sliderValues.g, sliderValues.b);
}

function updateSliderValuesFromInputEvent(e) {
    const target = e.currentTarget;
    const id = target.id;
    if(id === 'red') {
        sliderValues.r = target.value;
    } else if(id === 'green') {
        sliderValues.g = target.value;
    } else if(id === 'blue') {
        sliderValues.b = target.value;
    } else {
        throw 'Invalid id, should be red, green or blue';
    }
}

window.document.body.addEventListener('click', () => makeElementInvisible(colorPickerPanel));
colorPickerDisplay.addEventListener('click', (e) => {
    makeElementVisible(colorPickerPanel);
    e.stopPropagation();
});

/*
    actions code
 */

const placeholder = document.getElementById('placeholder');

const rectOptionsElem = document.getElementById('rect-options');
const brushOptionsElem = document.getElementById('brush-options');
const lineOptionsElem = document.getElementById('line-options');
const ellipseOptionsElem = document.getElementById('ellipse-options');
const arcOptionsElem = document.getElementById('arc-options');
const circleOptionsElem = document.getElementById('circle-options');
const allOptionElems = [rectOptionsElem, brushOptionsElem, lineOptionsElem, ellipseOptionsElem, arcOptionsElem, circleOptionsElem];

const rectActionElem = document.getElementById('rect-action');
const pencilActionElem = document.getElementById('pencil-action');
const brushActionElem = document.getElementById('brush-action');
const eraserActionElem = document.getElementById('eraser-action');
const clearareaActionElem = document.getElementById('cleararea-action');
const lineActionElem = document.getElementById('line-action');
const ellipseActionElem = document.getElementById('ellipse-action');
const arcActionElem = document.getElementById('arc-action');
const circleActionElem = document.getElementById('circle-action');



/*
    Application Code
 */

// reference to the canvas html element
const canvasElement = document.getElementById('paint-canvas');

// computed width of the canvas html element based on the css
const width = pixelStringToNumber(window.getComputedStyle(canvasElement).width);

// computed height of the canvas html element based on the css
const height = pixelStringToNumber(window.getComputedStyle(canvasElement).height);

// resize the canvas drawing surface to the elements computed size
resizeCanvas(canvasElement, width, height);


if (canvasElement.getContext) {
    const canvasRenderingContext = canvasElement.getContext('2d');

    setFillStyle(canvasRenderingContext, 200, 0, 0);
    fillRect(canvasRenderingContext,10, 10, 50, 50);

    setFillStyle(canvasRenderingContext, 0, 0, 200, 0.5);
    fillRect(canvasRenderingContext,30, 30, 50, 50);

    drawPixel(canvasRenderingContext, 500, 500);

    for(let i = 0; i < width; i += 5) {
        for(let j = 0; j < height; j += 5) {
            drawPixel(canvasRenderingContext, i, j);
        }
    }

    setStrokeStyle(canvasRenderingContext, 255, 0 , 0);
    strokeRect(canvasRenderingContext, 500, 500, 50, 50);
    clearRect(canvasRenderingContext, 100, 300, 250, 400);

    for(let i = width / 2; i < width; i += 15) {
        for(let j = 0; j < height; j += 5) {
            clearPixel(canvasRenderingContext, i, j);
        }
    }

    fillEllipse(canvasRenderingContext, 300, 300, 100, 300, 100, 0, 360);
    strokeEllipse(canvasRenderingContext, 500, 300, 300, 100, 100, 0, 360);

    fillArc(canvasRenderingContext, 500, 600, 20, 0, 360);
    strokeArc(canvasRenderingContext, 500, 600, 20, 180, 0);

    fillCircle(canvasRenderingContext, 400, 400, 10);
    strokeCircle(canvasRenderingContext, 400, 400, 10);

    drawLine(canvasRenderingContext, 0, 0, width, height);
    drawLine(canvasRenderingContext, width, 0, 0, height, 20);
}
