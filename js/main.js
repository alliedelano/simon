const controller = {
    blue: { 
      tone: 'beep blue',
    },
    green: {
      tone: 'beep green'
    },
    yellow: {
      tone: 'beep yellow'
    },
    red: {
      tone: 'beep red'
    }
}

let simonMoves;
let playerMoves;
let level;
  
const blueButton = document.getElementById('blue');
const greenButton = document.getElementById('green');
const yellowButton = document.getElementById('yellow');
const redButton = document.getElementById('red');
const msgEl = document.getElementById('message');
const levelEl = document.getElementById('levels');
  
blueButton.addEventListener('click', playerMove);
greenButton.addEventListener('click', playerMove);
yellowButton.addEventListener('click', playerMove);
redButton.addEventListener('click', playerMove);
  
function init(){
    console.log("let's set those state variables");
    simonMoves = [];
    playerMoves = [];
    level = 1;
    playerChoice = null;
    render();
}
  
function render(){
    console.log("let's make sure the view looks good to start the game!");
    msgEl.innerText = "hi, I'm Simon. wanna play?"
    levelUp() //to create one level
    createReadyButton()//to create 'sure!' button
};

function createReadyButton(){
    const readyButton =  document.createElement("BUTTON");
    readyButton.id = 'ready';
    const buttonDiv = document.getElementById('play-button');
    buttonDiv.append(readyButton);
    readyButton.innerText = "sure!"
    readyButton.addEventListener('click', letsPlay)
}
  
function letsPlay(){
    console.log("Let's play");
    msgEl.innerText = "it's easy: watch me, then do what I do. ready?"
    document.getElementById('ready').innerText = 'ready!'
    //clean up this logic - remove the button
    //document.getElementById('ready').onClick(removeButton)
};

function removeButton(){
    let buttonGone = document.getElementById('ready');
    buttonGone.remove;
    //make this work
}
  
function simonMove(){
    msgEl.innerText = "here I go..."
    //readyButton.remove;
    let choices = ['blue', 'green', 'yellow', 'red'];
    simonChoice = choices[Math.floor(Math.random()*4)];
    simonMoves.push(simonChoice);
    playerMoves = [];
    colorDisplay();
    //simonDisplays();
}

function colorDisplay(){
    for (move in simonMoves){
        //play the sound
        console.log(`playing ${controller[simonMoves[move]].tone}`)
        //make it light up
        console.log(`and animating ${simonMoves[move]} button`)

    }
};


function simonDisplays(){
    console.log("Simon is making the game board change");

}
  
  
function playerMove(){
    //make the buttons click-able? QA would break this.
    playerMoves.push(this.id);
    compareMoves()
}
  
function compareMoves(){
    console.log("Oooh let's see if each player move matches Simon's moves")
    if (playerMoves === simonMoves){
        youDidIt();
    } else {
        for (move in playerMoves){
            if (playerMoves[move] === simonMoves[move]){
                if (playerMoves.length === simonMoves.length){
                    youDidIt();
                } else {
                    console.log("not long enough yet");
                }
            } else {
                youLose();
            }
        }
    }
}
  
function youLose(){
    console.log("oh shit you weren't paying attention")
}
  
  function youDidIt(){
    console.log("sweet! winner! congrats and create ready button to make simon move again")
}
  
function levelUp(){
    console.log("add one to the level display!")
}
  