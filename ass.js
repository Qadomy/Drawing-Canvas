var canvas,
    context,
    dragging = false,
    dragStartLocation,
    snapshot;


function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return { x: x, y: y };
}

/*function takeSnapshot() {
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapshot() {
    context.putImageData(snapshot, 0, 0);
}*/

function drawLine(position) {
    context.beginPath();
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
    context.lineTo(dragStartLocation.x + 100, dragStartLocation.y);
    context.stroke();
}
function drawSquare(position) {
    context.beginPath();
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
    context.lineTo(dragStartLocation.x + 50, dragStartLocation.y);
    context.lineTo(dragStartLocation.x + 50, dragStartLocation.y + 50);
    context.lineTo(dragStartLocation.x, dragStartLocation.y + 50);
    context.lineTo(dragStartLocation.x, dragStartLocation.y);


    context.stroke();
}
function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);

}
function drawTriangle(position) {
    context.beginPath();
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
    context.lineTo(dragStartLocation.x + 50, dragStartLocation.y);
    context.lineTo(dragStartLocation.x + 25, dragStartLocation.y + 50);
    context.lineTo(dragStartLocation.x, dragStartLocation.y);


    context.stroke();
}
function drawCircle(position) {
    var radius = Math.sqrt(Math.pow((dragStartLocation.x - dragStartLocation.x + 50), 2) + Math.pow((dragStartLocation.y - dragStartLocation.y + 50), 2));
    context.beginPath();
    context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI, false);
}
function drawPolygon(position, sides, angle) {
    var coordinates = [],
        radius = Math.sqrt(Math.pow((dragStartLocation.x - dragStartLocation.x + 50), 2) + Math.pow((dragStartLocation.y - dragStartLocation.y + 50), 2)),
        index = 0;

    for (index = 0; index < sides; index++) {
        coordinates.push({ x: dragStartLocation.x + radius * Math.cos(angle), y: dragStartLocation.y - radius * Math.sin(angle) });
        angle += (2 * Math.PI) / sides;
    }

    context.beginPath();
    context.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        context.lineTo(coordinates[index].x, coordinates[index].y);
    }

    context.closePath();
}
function draw(position) {

    var fillBox = document.getElementById("fillBox"),
        shape = document.querySelector('input[type="radio"][name="shape"]:checked').value;
    if (shape === "circle") {
        drawCircle(position);
    }
    if (shape === "line") {
        drawLine(position);
    }

    if (shape === "polygon") {
        drawPolygon(position, 8, Math.PI / 4);
    }
    if (shape === "square") {
        drawSquare(position);
    }
    if (shape === "triangle") {
        drawTriangle(position);
    }
    if (fillBox.checked) {
        context.fill();
    } else {
        context.stroke();
    }
}
function drawCircleshow(position) {
    var radius = Math.sqrt(Math.pow((dragStartLocation.x - dragStartLocation.x + 50), 2) + Math.pow((dragStartLocation.y - dragStartLocation.y + 50), 2));
    context.beginPath();
    context.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
}
function dragStart(event) {
    console.log("pk");
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    //  takeSnapshot();
    draw((100, 100), "polygon");
}
function drag(event) {
    var position;
    if (dragging === true) {
        restoreSnapshot();
        position = getCanvasCoordinates(event);
        draw(position, "polygon");
    }
}
function dragStop(event) {
    dragging = false;
    restoreSnapshot();
    var position = getCanvasCoordinates(event);
    draw(position, "polygon");
}
function choosingcolor(){
    context.fillStyle = this.value;
    event.stopPropagation();
}
function changelinewidth(event){
    context.linewidth = this.value;
    event.stopPropagation();
}
function choosingcolor2(){
    context.strokeStyle=this.value;
    event.stopPropagation();
}
function cahngebackgroundcolor(){
    context.save();
    context.fillStyle = document.getElementById("backgroundcolor").value;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();
}

function init() {
    canvas = document.getElementById("canvas");

    var linewidth = document.getElementById("linewidth");

    var choosecolor2 = document.getElementById("choosecolor2");

    var backgroundcolor = document.getElementById("backgroundcolor");

    context = canvas.getContext('2d');
    context.strokeStyle = choosecolor2.value;
    context.fillStyle = choosecolor.value;
    context.lineWidth = linewidth.value;
    context.lineCap = 'round';

    

    choosecolor = document.getElementById("choosecolor"); 

    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);

    choosecolor.addEventListener("input", choosingcolor, false);
    choosecolor2.addEventListener("input", choosingcolor2, false);
    linewidth.addEventListener("input", changelinewidth, false);


    backgroundcolor.addEventListener("input", cahngebackgroundcolor, false);
}

window.addEventListener('load', init, false);