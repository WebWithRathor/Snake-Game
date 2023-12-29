const playBoard = document.querySelector("#playBoard");
const gameBoard = document.querySelector("#game");
const highScores = document.querySelector("#highScore span");
const scoreReset = document.querySelector("#scoreReset");
var foodX, foodY, snakeX = 10, snakeY = 15, LR = 0, TD = 0, snakeBody = [], score = 0;
let highScore = localStorage.getItem("highScore") || 0;
highScores.innerHTML = highScore;

scoreReset.addEventListener("click", function () {
    localStorage.setItem("highScore", 0);
    highScores.innerHTML = highScore;
    location.reload();
})
function changePosition() {
    foodX = Math.floor(Math.random() * 25) + 1
    foodY = Math.floor(Math.random() * 25) + 1
}
function snakeMove() {
    document.addEventListener("keydown", function (dets) {
        if (dets.key === 'ArrowUp' && TD != 1) {
            TD = -1;
            LR = 0;
        }
        else if (dets.key === 'ArrowDown' && TD != -1) {
            TD = 1;
            LR = 0;
        }
        else if (dets.key === 'ArrowRight' && LR != -1) {
            TD = 0;
            LR = 1;
        }
        else if (dets.key === 'ArrowLeft' && LR != 1) {
            TD = 0;
            LR = -1;
        }
        food();
    })
}
function snakeMovePhn() {
    document.querySelectorAll("#control i").forEach(function (e) {
        e.addEventListener("click", function (dets) {
            if (dets.target.id === 'Up' && TD != 1) {
                TD = -1;
                LR = 0;
            }
            else if (dets.target.id === 'Down' && TD != -1) {
                TD = 1;
                LR = 0;
            }
            else if (dets.target.id === 'Right' && LR != -1) {
                TD = 0;
                LR = 1;
            }
            else if (dets.target.id === 'Left' && LR != 1) {
                TD = 0;
                LR = -1;
            }
            food();

        })
    })
}
function food() {
    document.querySelector("#scored span").textContent = score;
    if (snakeX === foodX && snakeY === foodY) {
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("highScore", highScore);
        highScores.innerHTML = highScore;
        changePosition();
        snakeBody.push([foodY, foodX]);

    }
    if (snakeX > 25 || snakeX < 0 || snakeY > 25 || snakeY < 0) {
        gameOver();
    }

    playBoard.innerHTML = `<div id="food" style="grid-area: ${foodY}/${foodX};" class="bg-blue-700 rounded-xl"></div>`
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeY, snakeX];
    snakeY += TD;
    snakeX += LR;
    for (let i = 0; i < snakeBody.length; i++) {
        playBoard.innerHTML += `<div id="snake"  style="grid-area: ${snakeBody[i][0]}/${snakeBody[i][1]};" class="bg-red-700 rounded "></div>`
        if (i > 1 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver();
        }
    }
}
function gameOver() {
    clearInterval(move);
    gameBoard.innerHTML = `
        <div id="score" class="h-15  w-full bg-blue-400 flex justify-between items-center p-4">
        <h1 class="text-lg font-semibold text-zinc-800 flex gap-2 items-center">Score <span class="flex justify-between items-center px-2 rounded bg-zinc-900 text-white">${score}</span></h1>
                    <h1 id="highScore" class="text-lg font-semibold text-zinc-800 flex gap-2 items-center">High Score <span class="flex justify-between items-center px-2 rounded bg-zinc-900 text-white">${highScore}</span></h1>
        </div>
        <div id="gameOver" class="bg-zinc-900 h-96 w-full flex gap-4 flex-col items-center sm:justify-center  sm:pt-0 pt-20">
        <h1 class="text-white sm:text-3xl text-xl">Game Over</h1>
        <button id="reset" class="sm:px-6 sm:py-2 px-5 py-2  bg-blue-400 text-white rounded hover:bg-blue-600 transition-all  duration-.3">Reset</button>
        </div>
        `
    document.querySelector("#reset").addEventListener("click", function () { location.reload() })
}

changePosition();
food();
var move = setInterval(food, 200);
snakeMove();
snakeMovePhn();