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

  
function init(){
    console.log("let's set those state variables");
    simonMoves = [];
    playerMoves = [];
    level = 0;
    render();
}
  
function render(){
    console.log("let's make sure the view looks good to start the game!");
    msgEl.innerText = "hi, I'm Simon. wanna play?"
    levelUp()
    createSureButton()
};

function createSureButton(){
    const sureButton = document.createElement("BUTTON");
    sureButton.id = 'sure';
    buttonDiv.append(sureButton);
    sureButton.innerText = 'sure!'
    sureButton.addEventListener('click', letsPlay)
}

  
function letsPlay(){
    setTimeout(function(){
        document.getElementById('sure').remove();
        msgEl.innerText = "it's easy: watch me, then do what I do. ready?";
        createReadyButton();
    }, 500)
};

function createReadyButton(){
    const readyButton =  document.createElement("BUTTON");
    readyButton.id = 'ready';
    buttonDiv.append(readyButton);
    readyButton.innerText = 'ready!'
    readyButton.addEventListener('click', simonMove);
}

  
function simonMove(){
    setTimeout(function(){
        document.getElementById('ready').remove()
        msgEl.innerText = "here I go..."
        let choices = ['blue', 'green', 'yellow', 'red'];
        simonChoice = choices[Math.floor(Math.random()*4)];
        simonMoves.push(simonChoice);
        playerMoves = [];
        for(move in simonMoves){
            moveEl = document.getElementById(simonMoves[move]);
            moveElClasses = moveEl.classList;
            if (moveElClasses.contains('active')){
                moveEl.classList.remove('active');
            }
        }  
        simonDisplays();
    }, 500)
}

function playSound(){
    console.log(`playing ${controller[simonMoves[move]].tone}`);
    //let sound = controller[simonMoves[move]].tone;
    //sound.play()
    //sound.currentTime=0
}

function simonDisplays(){
    for (i=0; i< simonMoves.length; i++){
        setTimeout(i=> {
            moveEl = document.getElementById(simonMoves[i]);
            moveElClasses = moveEl.classList;
            moveEl.classList.add('active');
            playSound();
        }, 1000 * i, i)
    }
    setTimeout(function(){
        msgEl.innerText = 'your turn!'
        addButtonListeners();
    }, 500);
}

function addButtonListeners(){
    blueButton.addEventListener('click', playerMove);
    greenButton.addEventListener('click', playerMove);
    yellowButton.addEventListener('click', playerMove);
    redButton.addEventListener('click', playerMove);
}

function removeButtonListeners(){
    blueButton.removeEventListener('click', playerMove);
    greenButton.removeEventListener('click', playerMove);
    yellowButton.removeEventListener('click', playerMove);
    redButton.removeEventListener('click', playerMove)
}

function playerMove(){
    playerMoves.push(this.id);
    compareMoves()
}
  
function compareMoves(){
    for (move in playerMoves){
        if (playerMoves[move] === simonMoves[move] && playerMoves.length != simonMoves.length){
            console.log('not long enough yet!');
        } else if (playerMoves[move] != simonMoves[move]) {
            youLose();
        }
    }
    if (playerMoves[move] === simonMoves[move] && playerMoves.length === simonMoves.length){
        youDidIt();
    }
}
  
function youLose(){
    msgEl.innerText = "oh shit... you weren't paying attention";
    const replayButton =  document.createElement("BUTTON");
    replayButton.id = 'replay';
    buttonDiv.append(replayButton);
    replayButton.innerText = 'replay!'
    replayButton.addEventListener('click', init);
    removeButtonListeners();
}
  
  function youDidIt(){
    setTimeout(function(){
        msgEl.innerText = 'nice job! how about I make it trickier. ready?'
        levelUp();
        removeButtonListeners();
        createReadyButton();
    }, 500);
}
  
function levelUp(){
    let levelIncrease = document.createElement('div');
    levelIncrease.setAttribute('class', 'level');
    document.getElementById('levels').append(levelIncrease);
    level += 1
    console.log(level)
}
