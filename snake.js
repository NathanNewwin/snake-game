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

//Food
var foodX
var foodY


window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board
    
    placeSnake();
    placeFood();
    document.addEventListener("keydown", changeDirection)
    //update();
    setInterval(update, 1000/10); //100 milli sec
}

function update(){
    //Board
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    //Food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX == foodX && snakeY == foodY){
        placeFood();
    }

    //SnakeHead
    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
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
