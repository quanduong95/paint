const colorElement = document.getElementById('color-btn');
const eraserElement = document.getElementById('eraser-btn');
const decreaseElement = document.getElementById('decrease-btn');
const sizeElement = document.getElementById('size-btn');
const increaseElement = document.getElementById('increase-btn');
const saveElement = document.getElementById('save-btn');
const clearElement = document.getElementById('clear-btn');
const canvasElement = document.querySelector('canvas');
const ctx = canvasElement.getContext('2d');

let isDrawing = false;
let color = '#000000';
let size = 10;
let currentPosition = {
    x: 0,
    y: 0,
}

const nextPosition = {
    x: 0,
    y: 0,
}
document.addEventListener('mousedown', (e) => {
    currentPosition.x = e.offsetX;
    currentPosition.y = e.offsetY;
    isDrawing = true;
});

document.addEventListener('mousemove', (e) => {
    if (isDrawing) { 
        nextPosition.x = e.offsetX;
        nextPosition.y = e.offsetY;

        ctx.beginPath();
        ctx.arc(currentPosition.x, currentPosition.y, size, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(currentPosition.x,  currentPosition.y);
        ctx.lineTo(nextPosition.x, nextPosition.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = size * 2;
        ctx.stroke();

        currentPosition.x = nextPosition.x;
        currentPosition.y = nextPosition.y;
    }    
})

document.addEventListener('mouseup', () => {
    isDrawing = false;
})

colorElement.addEventListener('change', (e) => {
    color = e.target.value;
})
eraserElement.addEventListener('click', () => {
    color = '#ffffff';
})

increaseElement.addEventListener('click', () => {
    size += 1;
    size = size < 20 ? size : 20;
    sizeElement.innerText = size;
});

decreaseElement.addEventListener('click', () => {
    size -= 1;
    size = size > 1 ? size : 1;
    sizeElement.innerText = size;
});

clearElement.addEventListener('click', () => {
    let canvasIndex = canvasElement.getClientRects()[0];
    ctx.clearRect(0, 0, canvasIndex.width, canvasIndex.height);
});

saveElement.addEventListener('click', () => {
    let output = canvasElement.toDataURL('image/png');
    saveElement.setAttribute('href', output);
})