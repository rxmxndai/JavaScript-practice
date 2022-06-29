
const pressed = document.querySelectorAll(".buttong");
const scoreBoard = document.querySelector("#scoreBoard");
const computerDisplay = document.querySelector(".computer");
const playerDisplay = document.querySelector(".player");


let player = "", computer = "";



pressed.forEach(element =>  element.addEventListener("click", () => {
        
        player = element.textContent;

        computerMove();

        const winner = checkWinner();

        computerDisplay.textContent = `Computer chose ${computer}`;
        
        playerDisplay.textContent = `Player chose ${player}`;

        scoreBoard.textContent = winner;
}));







function computerMove() {
    const randN = Math.floor(Math.random() * 3) + 1;

    switch(randN) {
        case 1:
            computer = "Rock";
            break;
        case 2:
            computer = "Scissor";
            break;
        case 3:
            computer = "Paper";
            break;
    }
}


function checkWinner() {

    if (player == computer ) {
        return "Draw";
    }
    else if(player == "Rock") {
        return (computer == "Scissor")? "You won !": "Computer won !";
    }
    else if(player == "Paper") {
        return (computer == "Rock")? "You won !": "Computer won !";
    }
    else if(player == "Scissor") {
        return (computer == "Paper")? "You won !": "Computer won !";
    }

}
