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
    const originalWidth = canvasRenderingContext.lineWidth;
    canvasRenderingContext.lineWidth = width;
    canvasRenderingContext.stroke();
    canvasRenderingContext.lineWidth = originalWidth;
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
const placeholder2 = document.getElementById('placeholder2');

const rectOptionsElem = document.getElementById('rect-options');
const brushOptionsElem = document.getElementById('brush-options');
const lineOptionsElem = document.getElementById('line-options');
const ellipseOptionsElem = document.getElementById('ellipse-options');
const arcOptionsElem = document.getElementById('arc-options');
const circleOptionsElem = document.getElementById('circle-options');
const strokeOptionsElem = document.getElementById('fill-options');
const allOptionElems = [rectOptionsElem, brushOptionsElem, lineOptionsElem, ellipseOptionsElem, arcOptionsElem, circleOptionsElem, strokeOptionsElem];

const rectActionElem = document.getElementById('rect-action');
const pencilActionElem = document.getElementById('pencil-action');
const brushActionElem = document.getElementById('brush-action');
const eraserActionElem = document.getElementById('eraser-action');
const clearareaActionElem = document.getElementById('cleararea-action');
const lineActionElem = document.getElementById('line-action');
const ellipseActionElem = document.getElementById('ellipse-action');
const arcActionElem = document.getElementById('arc-action');
const circleActionElem = document.getElementById('circle-action');

const toolbarElem = document.getElementById('toolbar');
toolbarElem.addEventListener('input', (e) => {
    const target = e.target;
    const value = target.value;
    if(value === '') {
        target.style.backgroundColor = 'white';
        return;
    }
    const parse = parseInt(value);
    const [type, param] = target.name.split('-');
    if(type === 'brush' && param === 'brushType') {
        actions[type][param] = value;
        return;
    }
    if(isNaN(parse)) {
        target.style.backgroundColor = 'red';
        return;
    }
    if(actions[type] !== null) {
        if(actions[type][param] !== null) {
            actions[type][param] = parse;
        }
    }
    target.style.backgroundColor = 'white';
});

const ACTION_TYPES = {
    CLICK: 'CLICK',
    DRAG: 'DRAG',
    UPDOWN: 'UPDOWN'
}

const rectAction = {
    width: 25,
    height: 25,
    type: ACTION_TYPES.CLICK,
    action: function(canvasRenderingContext, filled, x, y) {
        let method = filled ? fillRect : strokeRect;
        method(canvasRenderingContext, x - this.width / 2, y - this.height / 2, this.width, this.height);
    }
};

const pencilAction = {
    type: ACTION_TYPES.DRAG,
    action: function(canvasRenderingContext, x, y) { drawPixel(canvasRenderingContext, x, y); }
};

const BRUSH_TYPE = {
    CIRCLE: 'CIRCLE',
    RECT: 'RECT'
}

const brushAction = {
    type: ACTION_TYPES.DRAG,
    size: 25,
    brushType: BRUSH_TYPE.CIRCLE,
    action: function(canvasRenderingContext, x, y) {
        if(this.brushType === BRUSH_TYPE.CIRCLE) {
            fillCircle(canvasRenderingContext, x, y, this.size);
        } else if(this.brushType === BRUSH_TYPE.RECT) {
            fillRect(canvasRenderingContext, x - this.size / 2, y - this.size / 2, this.size, this.size);
        } else {
            throw 'Invalid Brush Type Selected';
        }
    }
};

const eraserAction = {
    type: ACTION_TYPES.DRAG,
    action: function(canvasRenderingContext, x, y) { clearPixel(canvasRenderingContext, x, y); }
};

const clearareaAction = {
    type: ACTION_TYPES.UPDOWN,
    action: function(canvasRenderingContext, point1, point2) {
        if(point1.x === point2.x || point1.y === point2.y) return;
        const minX = point1.x < point2.x ? point1.x : point2.x;
        const minY = point1.y < point2.y ? point1.y : point2.y;
        const width = Math.abs(point1.x - point2.x);
        const height = Math.abs(point1.y - point2.y);
        clearRect(canvasRenderingContext, minX, minY, width, height);
    }
};

const lineAction = {
    width: 1,
    type: ACTION_TYPES.UPDOWN,
    action: function(canvasRenderingContext, point1, point2) {
        drawLine(canvasRenderingContext, point1.x, point1.y, point2.x, point2.y, this.width);
    }
};

const ellipseAction = {
    type: ACTION_TYPES.CLICK,
    xradius: 100,
    yradius: 200,
    rotation: 0,
    startAngle: 0,
    endAngle: 2 * Math.PI,
    action: function(canvasRenderingContext, filled, x, y) {
        const method = filled ? fillEllipse : strokeEllipse;
        method(canvasRenderingContext, x, y, this.xradius, this.yradius, this.rotation, this.startAngle, this.endAngle);
    }
};

const arcAction = {
    type: ACTION_TYPES.CLICK,
    radius: 100,
    startAngle: 0,
    endAngle: Math.PI,
    action: function(canvasRenderingContext, filled, x, y) {
        const method = filled ? fillArc : strokeArc;
        method(canvasRenderingContext, x, y, this.radius, this.startAngle, this.endAngle);
    }
};

const circleAction = {
    type: ACTION_TYPES.CLICK,
    radius: 100,
    action: function(canvasRenderingContext, filled, x, y) {
        const method = filled ? fillCircle : strokeCircle;
        method(canvasRenderingContext, x, y, this.radius);
    }
};

const actions = {
    rect: rectAction,
    pencil: pencilAction,
    brush: brushAction,
    eraser: eraserAction,
    cleararea: clearareaAction,
    line: lineAction,
    ellipse: ellipseAction,
    arc: arcAction,
    circle: circleAction
}

const actionOptionMap = new Map();

actionOptionMap.set(rectActionElem, {
    optionsElem: rectOptionsElem,
    action: rectAction
});

actionOptionMap.set(pencilActionElem, {
    optionsElem: null,
    action: pencilAction
});

actionOptionMap.set(brushActionElem, {
    optionsElem: brushOptionsElem,
    action: brushAction
});

actionOptionMap.set(eraserActionElem, {
    optionsElem: null,
    action: eraserAction
});

actionOptionMap.set(clearareaActionElem, {
    optionsElem: null,
    action: clearareaAction
});

actionOptionMap.set(lineActionElem, {
    optionsElem: lineOptionsElem,
    action: lineAction
});

actionOptionMap.set(ellipseActionElem, {
    optionsElem: ellipseOptionsElem,
    action: ellipseAction
});

actionOptionMap.set(arcActionElem, {
    optionsElem: arcOptionsElem,
    action: arcAction
});

actionOptionMap.set(circleActionElem, {
    optionsElem: circleOptionsElem,
    action: circleAction
});

function hideElement(elem) {
    elem.classList.add('hidden');
}

function unhideElement(elem) {
    elem.classList.remove('hidden');
}

function hideAllOptions() {
    allOptionElems.forEach(e => hideElement(e));
    unhideElement(placeholder);
    unhideElement(placeholder2)
}

function revealOption(option) {
    hideAllOptions();
    hideElement(placeholder);
    unhideElement(option);
}

let currentActionInfo = null;
let filled = false;

const fillActionElem = document.getElementById('fill-action');
fillActionElem.addEventListener('click', () => filled = true);
const strokeActionElem = document.getElementById('stroke-action');
strokeActionElem.addEventListener('click', () => filled = false);

function setupSingleClickListener(canvasRenderingContext, action) {
    const newListener = (e) => {
        const x = e.offsetX;
        const y = e.offsetY;
        const boundAction = action.action.bind(action);
        boundAction(canvasRenderingContext, filled, x, y);
    }

    currentActionInfo = {
        type: ACTION_TYPES.CLICK,
        mousedown: newListener
    };

    canvasElement.addEventListener('mousedown', newListener, false);
}

function setupDragClickListener(canvasRenderingContext, action) {
    let mouseDown = false;

    let mouseupListener = () => mouseDown = false;
    let mouseMoveListener = (action) => {
        const boundAction = action.action.bind(action)
        return (e) => {
            const x = e.offsetX;
            const y = e.offsetY;
            if(mouseDown) {
                boundAction(canvasRenderingContext, x, y);
            }
        }
    }

    const boundListener = mouseMoveListener(action);

    let mousedownListener = (e) => {
        mouseDown = true;
        boundListener(e);
    }

    canvasElement.addEventListener('mousedown', mousedownListener);
    canvasElement.addEventListener('mouseup', mouseupListener);
    canvasElement.addEventListener('mousemove', boundListener);


    currentActionInfo = {
        type: ACTION_TYPES.DRAG,
        mousedown: mousedownListener,
        mouseup: mouseupListener,
        mousemove: boundListener
    };
}

function setupUpDownClickListener(canvasRenderingContext, action) {
    let startPoint = {
        x: 0, y: 0
    };

    let endPoint = {
        x: 0, y: 0
    };

    let mouseDownListener = (e) => startPoint = { x: e.offsetX, y: e.offsetY };
    let mouseUpListener = (action) => {
        const boundAction = action.action.bind(action);
        return (e) => {
            endPoint = {x: e.offsetX, y: e.offsetY};
            boundAction(canvasRenderingContext, startPoint, endPoint);
        }
    }
    const boundListener = mouseUpListener(action);
    canvasElement.addEventListener('mousedown', mouseDownListener);
    canvasElement.addEventListener('mouseup', boundListener);

    currentActionInfo = {
        type: ACTION_TYPES.UPDOWN,
        mousedown: mouseDownListener,
        mouseup: boundListener
    };
}

function initializeAction(canvasRenderingContext, action) {
    const actionElement = action[0];
    const actionValue = action[1];
    const optionsElement = actionValue.optionsElem;
    const act = actionValue.action;
    actionElement.addEventListener('click', () => {
        breakdownActionListener();
        setupActionListener(canvasRenderingContext, act);
        let cb;
        if(optionsElement !== null) cb = () => revealOption(optionsElement);
        else cb = () => hideAllOptions();
        cb();
        if(act.type === ACTION_TYPES.CLICK) {
            hideElement(placeholder2);
            unhideElement(strokeOptionsElem);
        }
    });
}

function setupActionListener(canvasRenderingContext, action) {
    if(action.type === ACTION_TYPES.CLICK) {
        setupSingleClickListener(canvasRenderingContext, action);
    } else if(action.type === ACTION_TYPES.DRAG) {
        setupDragClickListener(canvasRenderingContext, action);
    } else if(action.type === ACTION_TYPES.UPDOWN) {
        setupUpDownClickListener(canvasRenderingContext, action);
    } else {
        throw 'Invalid Action Type';
    }
}

function breakdownActionListener() {
    if(currentActionInfo === null) return;
    if(currentActionInfo.type === ACTION_TYPES.CLICK) {
        breakdownSingleClickListener();
    } else if(currentActionInfo.type === ACTION_TYPES.DRAG) {
        breakdownDragClickListener();
    } else if(currentActionInfo.type === ACTION_TYPES.UPDOWN) {
        breakdownUpDownClickListener();
    } else {
        throw 'Invalid Action Type';
    }
}

function breakdownSingleClickListener() {
    if(currentActionInfo === null || currentActionInfo.type !== ACTION_TYPES.CLICK);
    canvasElement.removeEventListener('mousedown', currentActionInfo.mousedown);
}

function breakdownDragClickListener() {
    if(currentActionInfo === null || currentActionInfo.type !== ACTION_TYPES.DRAG);
    canvasElement.removeEventListener('mousedown', currentActionInfo.mousedown);
    canvasElement.removeEventListener('mouseup', currentActionInfo.mouseup);
    canvasElement.removeEventListener('mousemove', currentActionInfo.mousemove);
}

function breakdownUpDownClickListener() {
    if(currentActionInfo === null || currentActionInfo.type !== ACTION_TYPES.UPDOWN);
    canvasElement.removeEventListener('mousedown', currentActionInfo.mousedown);
    canvasElement.removeEventListener('mouseup', currentActionInfo.mouseup);
}

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

    for(const action of actionOptionMap) {
        initializeAction(canvasRenderingContext, action);
    }

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
        setColorDisplayBackgroundFromSliderValues();
        setFillStyle(canvasRenderingContext, sliderValues.r, sliderValues.g, sliderValues.b, 1);
        setStrokeStyle(canvasRenderingContext, sliderValues.r, sliderValues.g, sliderValues.b, 1);

        e.addEventListener('input', (e) => {
            updateSliderValuesFromInputEvent(e);
            setColorViewerBackgroundFromSliderValues();
            setColorDisplayBackgroundFromSliderValues();
            setFillStyle(canvasRenderingContext, sliderValues.r, sliderValues.g, sliderValues.b, 1);
            setStrokeStyle(canvasRenderingContext, sliderValues.r, sliderValues.g, sliderValues.b, 1);
        });
    });
}
