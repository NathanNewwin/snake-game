//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
var score = 0;


//Snake Head
var snakeX
var snakeY

var velocityX = 0;
var velocityY = 0;

//Snake Body
var snakeBody = [];

//Food
var foodX
var foodY

var gameOver = false;


window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board
    
    placeSnake();
    placeFood();
    document.addEventListener("keydown", changeDirection);
    //document.getElementById("reset-button").addEventListener("click", resetGame);
    //update();
    gameInterval = setInterval(update, 1000/10) //100 milli sec
}

function update(){
    if (gameOver){
        return;
    }
    //Board
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    //Food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //Eating Food
    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFood();
        updateScore(score + 1);
    }

    for (let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    //SnakeHead
    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //Game Over Conditions
    if (snakeX < 0 || snakeX > cols * blockSize - 1 || snakeY < 0 || snakeY > rows * blockSize - 1){
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("Game Over");
        }
    }
}

function placeSnake(){
    snakeX = Math.floor(Math.random() * cols) * blockSize;
    snakeY = Math.floor(Math.random() * rows) * blockSize;
}

function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    if(e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    if(e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

function resetGame(){
    clearInterval(gameInterval);
    gameOver = false;
    snakeBody = [];
    velocityX = 0;
    velocityY = 0;
    score = 0;
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board
    
    placeSnake();
    placeFood();
    gameInterval = setInterval(update, 1000/10) //100 milli sec
}

function updateScore(newScore){
    score = newScore
    document.getElementById("score-display").textContent = "Score: " + score;
}