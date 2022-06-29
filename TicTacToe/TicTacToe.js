

const cells = document.querySelectorAll(".cell");
const statusField = document.querySelector("#statusField");
const restartBtn = document.querySelector("#restartBtn");


const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6],
    [0, 3, 6]
];


let options = ["", "", "", "", "", "", "", "", ""];

let nextMove = "X";

let running = false;

initializeGame();

function initializeGame () {
    running = true;

    cells.forEach(box => box.addEventListener("click", cellClicked));

    restartBtn.addEventListener("click", restartGame);
    
}


function cellClicked () {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !running) {
        return;
    }
    
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = nextMove;
    cell.textContent = nextMove;
    
}

function changePlayer () {
    
    if (nextMove == "X") {
        nextMove = "O";
    }
    else {
        nextMove = "X";
    }
    statusField.textContent = `${nextMove}'s turn`;
}

function checkWinner() {

    let roundWon = false;

    for (let i = 0; i<winCondition.length; i++) {
        const condition = winCondition[i];
        const A = options[condition[0]];
        const B = options[condition[1]];
        const C = options[condition[2]];

        if (A == "" || B == "" || C == "") {
            continue;
        }
        else if (A == B && B == C) {
            roundWon = true;
            break;
        }
        
    }

    if (roundWon) {
        statusField.textContent = ` "${nextMove}" WON the match`;
        running = false;
    }

    else if (!options.includes("")) {
        statusField.textContent = " Draw!";
        running = false;
    }
    else {
        changePlayer();
    }
    
}

function restartGame() {
    running=true;
    options = ["", "", "", "", "", "", "", "", ""];
    nextMove = "X";
    statusField.textContent = `${nextMove}'s turn`;
    cells.forEach(box => box.textContent = "");

}
