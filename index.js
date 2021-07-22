// global variables
var greenAudio = new Audio('sounds/green.mp3');
var redAudio = new Audio('sounds/red.mp3');
var yellowAudio = new Audio('sounds/yellow.mp3');
var blueAudio = new Audio('sounds/blue.mp3');
var wrongAudio = new Audio('sounds/wrong.mp3');

var game = {
    buttonSequence: [],
    levelStatus: 0,
    pointOfSequence: 0, // in which index of the button Sequence is the player 
    makeSound() {},
    namingNewButton() {}
};




/* Add Event Listener*/
$('.button').click(handleButtonClick);
$(document).keydown(handleKeydown);
$(document).click(handlePadgeClick);
$(".pop-up").click(handleExplanationClick)

/* Handel Listener */

function handleKeydown(event) {
    if (game.levelStatus == 0) { // not in the middle of the game - new game can start
        // setTimeout(createSequence, 200);
        createSequence();
        namingNewButton();
    }
}

function handleButtonClick(event) {
    console.log("");
    //--check if input is right
    if (game.levelStatus !== 0) { //a game is going on
        console.log("you clicked " + event.currentTarget.classList[2])
        if (checkInput(event.currentTarget.classList[2]) == true) {
            makeSound(event.currentTarget.classList[2]);
            console.log("pointOfSequence: " + game.pointOfSequence);
            console.log("levelStatus: " + game.levelStatus);
            if ((game.pointOfSequence) == game.levelStatus) {
                // setTimeout(namingNewButton, 1500);
                namingNewButton();
            }
        } else {
            makeSound("wrong");
            $("h1").text("Game Over, Press Any Key to Restart ");
            setTimeout(function () {
                game.levelStatus = 0;
            }, 1500);
        
        }
    }
}

function handlePadgeClick() {
    if (game.levelStatus == 0) { // not in the middle of the game - new game can start
        createSequence();
        namingNewButton();
    }
}


/* diffrent Sound for each button */
function makeSound(currentSound) {
    switch (currentSound) {
        case "green-button":
            greenAudio.play();
            break;
        case "red-button":
            redAudio.play();
            break;
        case "yellow-button":
            yellowAudio.play();
            break;
        case "blue-button":
            blueAudio.play();
            break;
        case "wrong":
            wrongAudio.play();
            break;
        default:
            console.log("no Sound");
            break;
    }
}


/* fill up sequenceArray */
function createSequence() {
    var newNumber;
    for (let index = 0; index < 20; index++) {
        newNumber = Math.floor(Math.random() * 4 + 1);

        switch (newNumber) {
            case 1:
                game.buttonSequence[index] = "green-button"
                break;
            case 2:
                game.buttonSequence[index] = "red-button"
                break;
            case 3:
                game.buttonSequence[index] = "yellow-button"
                break;
            case 4:
                game.buttonSequence[index] = "blue-button"
                break;

            default:
                alert("Error. Please load the padge again.")
                break;
        }
    }
    console.log(game.buttonSequence);
}


/* Change Level Status in h1 on web and in programm*/
function changeLevel() {
    game.levelStatus = game.levelStatus + 1;
    $("h1").text("Level " + game.levelStatus);
}

/* return bool, check if t */
function checkInput(clickedButton) {
    if (game.buttonSequence[game.pointOfSequence] == clickedButton) {
        game.pointOfSequence = game.pointOfSequence + 1;
        return true;
    } else {
        return false;
    }
}

function namingNewButton() {
    var a = game.buttonSequence[game.levelStatus - 1];

    changeLevel();
    setTimeout(function () {
        makeSound(game.buttonSequence[game.levelStatus - 1]);
        // -- visuel Diffrence of buttonSequence[i]
        $("." + game.buttonSequence[game.levelStatus - 1]).addClass("next-button");
        setTimeout(function () {
            $("." + game.buttonSequence[game.levelStatus - 1]).removeClass("next-button")
        }, 100);
        game.pointOfSequence = 0;
        console.log("New Button : " + game.buttonSequence[game.levelStatus - 1]);
    }, 1000);

}