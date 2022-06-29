const restartBtn = document.querySelector("#restartt");
const myCanvas = document.querySelector("#gameScreen");
const scored = document.querySelector("#scored");


let mode = document.querySelectorAll(".mode");

let _tyme = 250;




mode.forEach(element => element.addEventListener("click", () => {
    let selected  = element.textContent; 

    
    if (selected == "Easy") {
        
        _tyme = 250;
    }
    else if (selected == "Medium") {
        _tyme = 160;
    }
    else if (selected == "Hard") {
        _tyme = 100;
    }
}));



restartBtn.addEventListener("click", restartGame);
window.addEventListener("keydown", snakeMovement);

const context = myCanvas.getContext("2d");


const height = myCanvas.height;
const width = myCanvas.width;

let appleX, appleY;
let score = 0;
const sqUnit = 25;
let gameRunning = false;
let snake = [
    {x: sqUnit, y: 0},
    {x: 0, y:0}
];


xIncrement = sqUnit;
yIncrement = 0;

////////////////////////////////////////////////////

gameStart();

function gameStart() {
    apple();
    newApple();
    gameRunning = true;
    continueGame();
}

function continueGame() {
    if (gameRunning) {
        setTimeout( () => {
            eraseCanvas();
            newApple();
            newSnake();
            startSnake();
            isGameOver();
            continueGame();
        }, _tyme);
    }
    else {
        gameOver();
    }
}


function eraseCanvas() {
    context.fillStyle = "BLACK";
    context.fillRect(0, 0, width, height);
}

function apple() {
    function randomLocation (limit) {
        const random = Math.round(Math.random() * (limit - sqUnit)/sqUnit ) * sqUnit ;
        return random;
        
    }
    appleX = randomLocation(width);
    appleY = randomLocation(height);

}

function newApple() {
    context.fillStyle = "red";
    context.fillRect(appleX, appleY, sqUnit, sqUnit);
}   

function newSnake() {
    context.fillStyle = "yellow";
    snake.forEach( ss => {
        context.fillRect(ss.x, ss.y, sqUnit, sqUnit);
    });
}


function startSnake() {
    const head = {x: snake[0].x + xIncrement,
                y: snake[0].y + yIncrement
            };
    snake.unshift(head);
    

    if (snake[0].x == appleX && snake[0].y == appleY) {
        score += 1;
        scored.textContent = `Score : ${score}`; 
        apple();
    }
    else {
        snake.pop();
    }
}


function isGameOver() {
    switch (true){
        case (snake[0].x >= width):
            gameRunning = false;
            break;
        case (snake[0].y > height):
            gameRunning = false;
            break;
        case (snake[0].x < 0):
            gameRunning = false;
            break;
        case (snake[0].y < 0):
            gameRunning = false;
            break;
    }    

    for (let i=1; i<snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            gameRunning = false;
        }
    }
}


function gameOver() {
    context.font = "20px cursive";
    context.textAlign = "center";
    context.fillStyle = "yellow";
    context.fillText("Game Over!", width/2, height/2);
}


function restartGame() {
    xIncrement = sqUnit, yIncrement=0;
    score = 0;
    snake = [
        {x: sqUnit, y: 0},
        {x: 0, y:0}
    ];
    scored.textContent = `Score : ${score}`;
    gameStart();
}



function snakeMovement(event) {
    const press = event.keyCode;

    const leftArrow = 37;
    const upArrow = 38;
    const rightArrow = 39;
    const downArrow = 40;




    const goUp = (yIncrement == -sqUnit);
    const goDown =(yIncrement == sqUnit);
    const goLeft = (xIncrement == -sqUnit);
    const goRight =(xIncrement == sqUnit);

    switch (true) {
        case (press == downArrow && !goUp):
            xIncrement = 0;
            yIncrement = sqUnit;
            break;
        case (press == upArrow && !goDown):
            xIncrement = 0;
            yIncrement = -sqUnit;
            break;
        case (press == leftArrow && !goRight):
            xIncrement = -sqUnit;
            yIncrement = 0;
            break;
        case (press == rightArrow && !goLeft):
            xIncrement = sqUnit;
            yIncrement = 0;
            break;
    }
}

