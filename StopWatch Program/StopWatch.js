// Stop Watch

const display = document.getElementById("display");
const startCanvas = document.querySelector("#startBtn");
const resetCanvas = document.querySelector("#resetBtn");



let pp = startCanvas.getContext("2d");
let rr = resetCanvas.getContext("2d");

pp.beginPath();
rr.beginPath();

// function call for drawing the play button and reset button
drawPlay();
drawResett();


let start=0, elapsed=0, current=0;
let paused = true;
let interval;
let hours=0, minutes=0, seconds=0;


// Start / pause the timer
startCanvas.addEventListener("click", () => {
    if (paused) {
        drawPause();
        paused = false;
        start = Date.now() - elapsed;

        interval = setInterval(displayTime, 1000);
    }

    else {
        drawPlay();
        paused = true;
        elapsed = Date.now() - start;
        clearInterval(interval);
    }
});


// Reset the timer
resetCanvas.addEventListener("click", () => {
    start=0, elapsed=0, current=0;
    paused = true;
    hours=0, minutes=0, seconds=0;
    clearInterval(interval);

    display.textContent = `00:00:00`;
});


function displayTime() {

    elapsed = Date.now() - start;

    hours = Math.floor(elapsed / (1000 * 24 * 60  * 60) % 60 );
    minutes = Math.floor(elapsed / (1000 * 24 * 60) % 60 );
    seconds = Math.floor(elapsed / 1000 % 60);

    hours = maintainPadding(hours);
    minutes = maintainPadding(minutes);
    seconds = maintainPadding(seconds);

    display.textContent = `${hours}:${minutes}:${seconds}`;

    function maintainPadding(unit) {
        return (("0") + unit).length > 2 ? unit: ("0") + unit;
    }
}



// 200, 80
function drawPlay() {
    pp.clearRect(75, 10, 10, 60);
    pp.clearRect(115, 10, 10, 60);

    pp.fillStyle = "lightgreen";
    pp.lineWidth = 10;
    pp.moveTo(75, 10);
    pp.lineTo(75, 70);
    pp.lineTo(125, 40);
    pp.lineTo(75, 10);
    pp.stroke();
    pp.fill();
}

function drawPause() {
    pp.clearRect(0, 0, 200, 80);

    pp.strokeRect(75, 10, 10, 60);
    pp.fillStyle = "lightgreen";
    pp.fillRect(75, 10, 10, 60);

    pp.strokeRect(115, 10, 10, 40);
    pp.fillStyle = "lightgreen";
    pp.fillRect(115, 10, 10, 60);
}


function drawResett() {
    
    rr.strokeStyle = "lightgreen";
    rr.lineWidth = 10;
    rr.moveTo(70, 10);
    rr.lineTo(120, 60);

    rr.moveTo(70, 60);
    rr.lineTo(120, 10);
    rr.stroke();

    console.log(rr.strokeStyle);
}
