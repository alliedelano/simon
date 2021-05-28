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
  
const gameBoard = document.getElementById('game-board');
const blueButton = document.getElementById('blue');
const greenButton = document.getElementById('green');
const yellowButton = document.getElementById('yellow');
const redButton = document.getElementById('red');
const msgEl = document.getElementById('message');
const levelEl = document.getElementById('levels');
const buttonDiv = document.getElementById('play-button')
  
blueButton.addEventListener('click', playerMove);
greenButton.addEventListener('click', playerMove);
yellowButton.addEventListener('click', playerMove);
redButton.addEventListener('click', playerMove);

  
function init(){
    console.log("let's set those state variables");
    simonMoves = [];
    playerMoves = [];
    level = 0;
    playerChoice = null;
    render();
}
  
function render(){
    console.log("let's make sure the view looks good to start the game!");
    msgEl.innerText = "hi, I'm Simon. wanna play?"
    levelUp()
    const sureButton = document.createElement("BUTTON");
    sureButton.id = 'ready';
    buttonDiv.append(sureButton);
    sureButton.innerText = 'sure!'
    sureButton.addEventListener('click', letsPlay)
};

function createReadyButton(){
    const readyButton =  document.createElement("BUTTON");
    readyButton.id = 'ready';
    buttonDiv.append(readyButton);
    readyButton.innerText = 'ready!'
    readyButton.addEventListener('click', simonMove);
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
    //simonDisplays();
}


//if there isn't anything in simon's array and the user pushes buttons
//maybe yell at the player with a heading?


function colorDisplay(){
    gameBoard.classList.remove('active');
    playSound();


    for (move in simonMoves){
        gameBoard.classList.remove('active')
    }

        }
        if (!simonMoves.includes(move)){
            let button = document.getElementById(move)
            button.classList.add('active');
        } else {
            
        }




    
    //resetAnimation() - find the ones that need to be reset
    //timer
   //for (move in simonMoves){
      // var count = 0;
      // if ()
//   }


      //  if (move in simonMoves){
        //    resetAnimation();
     //   } else {
     //       console.log("hasn't come up yet!");
   //     }
   // }
   // for (move in simonMoves){
        //play the sound
        //console.log(`playing ${controller[simonMoves[move]].tone}`)

    }
// };

function playSound(){
    console.log(`playing ${controller[simonMoves[move]].tone}`);
    let sound = controller[move].tone;
    sound.play()
    sound.currentTime=0
}

function simonDisplays(){
    console.log("Simon is making the game board change");
    //timer function of colorDisplay() for each in order.
    //make each one active in turn;



        }
        setTimeout (colorDisplay, 2000);
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
    msgEl.innerText = "oh shit... you weren't paying attention";
    //create replay button - init & render

}
  
  function youDidIt(){
    console.log("sweet! winner! congrats and create ready button to make simon move again")
    createReadyButton();
}
  
function levelUp(){
    let level = document.createElement('div');
    level.setAttribute('class', 'level');
    document.getElementById('levels').append(level);
    level += 1;
}
  