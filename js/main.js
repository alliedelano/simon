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
let playerMovesNum;
let level;
let highScore = 0;
  
const gameBoard = document.getElementById('game-board');
const blueButton = document.getElementById('blue');
const greenButton = document.getElementById('green');
const yellowButton = document.getElementById('yellow');
const redButton = document.getElementById('red');
const msgEl = document.getElementById('message');
const levelEl = document.getElementById('levels');
const buttonDiv = document.getElementById('play-button');
const levels = document.getElementById('levels');
const sureButtonEl = document.getElementById('sure');
const moves = document.getElementById('moves');

sureButtonEl.addEventListener('click', init)
  
function init(){
    simonMoves = [];
    playerMoves = [];
    level = 0;
    renderGame();
}

function createSureButton(){
    const sureButton = document.createElement("BUTTON");
    sureButton.id = 'sure';
    buttonDiv.append(sureButton);
    sureButton.innerText = 'sure!'
    sureButton.addEventListener('click', init)
}

  
function renderGame(){
    setTimeout(function(){
        document.getElementById('sure').remove();
        msgEl.innerText = "it's easy: watch me, then do what I do. ready?";
        levelUp();
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
    }, 200);
    setTimeout(function(){
        simonDisplays();
    }, 750);
}


function simonDisplays(){
    for (i=0; i< simonMoves.length; i++){
        setTimeout(i=> {
            moveEl = document.getElementById(simonMoves[i]);
            moveElClasses = moveEl.classList;
            moveEl.classList.add('active');
            setTimeout(i=> {
                moveEl.classList.remove('active')
            }, 200 * (i + 1), i);
        }, 1200 * (i + 1),i);
    }
    setTimeout(function(){
        msgEl.innerText = 'your turn!'
        addButtonListeners();
    }, 1200 * (simonMoves.length + 1));
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
    this.blur();
    moveUp();
    compareMoves();
}
  
function compareMoves(){
    for (move in playerMoves){
        if (playerMoves[move] != simonMoves[move]) {
            youLose();
        }
    }
    if (playerMoves[move] === simonMoves[move] && playerMoves.length === simonMoves.length){
        youDidIt();
    }
}
  
function youLose(){
    msgEl.innerText = "bummer. that wasn't quite it. want to play again?";
    createSureButton();

    removeButtonListeners();
    resetLevels();
    resetMoves();
}

function replay(){
    document.getElementById('sure').remove();
}

function resetLevels(){
    let levelDot = document.querySelectorAll('.level');
    for (dot of levelDot){
        dot.classList.remove('level');
    }
}

function youDidIt(){
    setTimeout(function(){
        msgEl.innerText = 'nice job! how about I make it trickier. ready?'
        levelUp();
        removeButtonListeners();
        createReadyButton();
        resetMoves();
    }, 500);
    
}
  
function levelUp(){
    let levelIncrease = document.createElement('div');
    levelIncrease.setAttribute('class', 'level');
    levels.append(levelIncrease);
    level += 1;
    renderHighScore()
}

function moveUp(){
    let moveIncrease = document.createElement('div');
    moveIncrease.setAttribute('class', 'move');
    moves.append(moveIncrease);
}

function resetMoves(){
    let moveDot = document.querySelectorAll('.move');
    for (dot of moveDot){
        dot.classList.remove('move');
    }
}

function renderHighScore(){
    if (level - 1 > highScore){
        highScore +=1;
        document.getElementById('high-score').innerText = `High Score: ${highScore}`;
    }
}
