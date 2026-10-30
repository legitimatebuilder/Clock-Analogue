// 2π radians = 360° for full circle
// π radians = 180° for half circle

let width = 500;
let height = width;
let radius = width / 2;

let canvas;
let context;


window.onload = function () {
    canvas = document.getElementById("clock");
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext("2d");

    context.translate(radius, radius) // As width and height are the same and radius is equivalent to half of width or width / 2. //
    radius = radius * 0.90; // In order to fit the radius within the canvas bounds //
    drawClock();
};


function drawClock() {
    drawFace();
    drawNumbers();
    drawTime();
    setTimeout(drawClock, 1000); // 1000 milliseconds = 1 second //
};


function drawFace() {
    context.beginPath();
    context.arc(0, 0, radius, 0, 2 * Math.PI);

    context.strokeStyle = "#000";
    context.lineWidth = radius * 0.1;
    context.stroke();

    context.fillStyle = "whitesmoke";
    context.fill();
};


function drawNumbers() {
    context.font = `${radius * 0.20}px times new roman`;
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillStyle = "#000";

    for (let num = 1; num <= 12; num++) {
        let angle = num * Math.PI / 6;
        context.rotate(angle);
        context.translate(0, -radius * 0.85);
        context.rotate(-angle); // to show the inverted numbers visually correct //

        context.fillText(num.toString(), 0, 0);

        context.rotate(angle); // to rotate back the angle used to visually correct the inverted numbers //
        context.translate(0, radius * 0.85);
        context.rotate(-angle);
    }
};


function drawTime() {
    let now = new Date();
    let hours = now.getHours() % 12;
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    console.log(hours, minutes, seconds);

    let secondAngle = seconds * Math.PI / 30; // 60 seconds * PI / 30 = 2 * PI //
    context.strokeStyle = "red";
    drawHands(secondAngle, radius * 0.75, radius * 0.01);

    let minuteAngle = minutes * Math.PI / 30; // 60 minutes * PI / 30 = 2 * PI //
    context.strokeStyle = "black";
    drawHands(minuteAngle, radius * 0.70, radius * 0.02); // (minuteAngle, length, width) //

    let hourAngle = hours * Math.PI / 6; // 12 hours * PI / 6 = 2 * PI //
    hourAngle += minuteAngle / 12;
    context.strokeStyle = "black";
    drawHands(hourAngle, radius * 0.50, radius * 0.03);

    context.beginPath();
    context.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    context.fillStyle = "black";
    context.fill();
};


function drawHands(angle, length, width) {
    context.beginPath();
    context.lineWidth = width;
    context.lineCap = "round";

    context.moveTo(0, 0);
    context.rotate(angle);
    context.lineTo(0, -length);
    context.stroke();
    context.rotate(-angle); // to undo the rotation //
};