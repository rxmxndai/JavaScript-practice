// Arrray of buttons
const buttons = document.querySelectorAll(".controls");
// live feedback for buttons pressed
const display = document.querySelector(".screen");
// evaluated value using eval(textContent)
const maindisplay = document.querySelector(".mainScreen");


buttons.forEach(displayOnScreen);



function displayOnScreen(element) {

    element.addEventListener("click",  (e) => {

        const pressedValue = e.target.innerText;

        switch (pressedValue){
            case 'C':
                display.innerText = "";
                maindisplay.innerText = "";
                break;
            case '←':
                if (display.innerText.length > 0){
                    display.innerText = display.innerText.slice(0, -1);
                }
                break;
            case '=':
                try{
                    if (display.innerText.length > 12) {
                        
                        maindisplay.innerText = "Error !";
                    }
                    else {
                        maindisplay.innerText = eval(display.innerText);
                    }
                } catch {
                    maindisplay.innerText = "Error"
                    display.innerText = '';
                }
                break;
            default:
                display.innerText += e.target.innerText;
                if (display.innerText.length > 12) {
                    maindisplay.innerText = "Value out of bound";
                    display.innerText =  '';
                }

        }
    });
}
