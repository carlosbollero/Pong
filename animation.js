
var canvas;
var canvasContext;
/*var canvasWidht = window.innerWidth;
var canvasHeight = window.innerHeight;*/

const FRAMESPERSECOND = 50;

const PADDLE_HEIGHT = 100;
const PADDLE_WIDHT = 10;
const PADDLE_PADDING = 20;
const PADDLE_POS_X = 0 + PADDLE_PADDING;
const PADDLE_2_POS_X = 800 - (PADDLE_PADDING + PADDLE_WIDHT);
var paddlePosY = 250;
var paddle2PosY = 250;

const BALL_RADIUS = 7;
const BALL_INITAL_X_SPEED = 8;
const BALL_INITAL_Y_SPEED = 5;
var ballPosX;
var ballPosY;
var ballSpeedX;
var ballSpeedY;

var points = 0;



function drawBall() {
    
    console.log("pos (" + ballPosX + "," + ballPosY + ")");
    drawCircle(ballPosX, ballPosY, BALL_RADIUS, 'green');
    
}

function drawCircle(centerX, centerY, radius, color){
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function drawField() {
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    for (var i = 0; i < canvas.height / 20; i++){
        var height = canvas.height /20 - 15;
        var lastPos = i * canvas.height / 20;
        
        drawRect(canvas.width/2,lastPos,1,height,'white');
        
    }
}

function drawScorer() {
    canvasContext.fillStlye = "white";
	canvasContext.font = "16px Arial, sans-serif";
	canvasContext.textAlign = "left";
	canvasContext.textBaseline = "top";
	canvasContext.fillText("Score: " + points, 60, 30 );
    console.log("hey");
}

function drawPaddles(){
    drawRect(PADDLE_POS_X, paddlePosY, PADDLE_WIDHT, PADDLE_HEIGHT, 'white');
    drawRect(PADDLE_2_POS_X, paddle2PosY, PADDLE_WIDHT, PADDLE_HEIGHT, 'white');
}

function drawRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

function draw() {
    
    drawField();
    drawScorer();
    drawPaddles();
    drawBall();
}

function moveBall() {
    
    ballPosX += ballSpeedX;
    ballPosY += ballSpeedY;
    
    if (ballPosX > canvas.width - BALL_RADIUS){
        ballSpeedX = -ballSpeedX;
        /*ballReset();*/
        gameReset();
    }
    
    if ( ballPosX < 0 + BALL_RADIUS) {
        ballSpeedX = -ballSpeedX;
        gameReset();
    }
    
    if ((ballPosX + BALL_RADIUS >= PADDLE_2_POS_X) && ((ballPosY > paddle2PosY) && (ballPosY < paddle2PosY + PADDLE_HEIGHT))){
        ballSpeedX = -ballSpeedX;   
    }
    
    if ((ballPosX - BALL_RADIUS <= PADDLE_POS_X + PADDLE_WIDHT) && ((ballPosY > paddlePosY) && (ballPosY < paddlePosY + PADDLE_HEIGHT))){
        ballSpeedX = -ballSpeedX;
        ballSpeedX++;
        points++;
    }
    
    if (ballPosY > canvas.height - BALL_RADIUS){
        ballSpeedY = -ballSpeedY;
    }
    if (ballPosY < 0 + BALL_RADIUS){
        ballSpeedY = -ballSpeedY;   
    }
}

function AIPaddleMovement(){
    var paddle2YCenter = paddle2PosY + PADDLE_HEIGHT/2;
    if (paddle2YCenter < ballPosY - 35){
        paddle2PosY += 5;
    }else if (paddle2YCenter > ballPosY + 35){
        paddle2PosY -= 5;
    }
}

function ballReset() {
    ballPosX = canvas.width / 2;
    ballPosY = canvas.height / 2;
    ballSpeedX = BALL_INITAL_X_SPEED;
    ballSpeedY = BALL_INITAL_Y_SPEED;
}

function scorerReset(){
    points = 0;
}

function gameReset(){
    ballReset();
    scorerReset();
}

function getMousePos(event){
    var root = document.documentElement;
    var rect = canvas.getBoundingClientRect();
    var mousePosX = event.clientX - rect.left - root.scrollLeft;
    var mousePosY = event.clientY - rect.top - root.scrollTop;
    
    return {
        x: mousePosX,
        y: mousePosY
    };
    
}

function update() {
    moveBall();
    AIPaddleMovement();
    draw();
}

window.onload = function () {
    
    console.log('init');
    canvas = document.getElementById('gameCanvas');
    canvasContext =  canvas.getContext('2d');
    
/*    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;*/
    
    
    gameReset();
    
    /*update();*/
    setInterval(update, 1000 / FRAMESPERSECOND);
    
    canvas.addEventListener('mousemove', 
                function (event){
                    var mousePos = getMousePos(event);
                    paddlePosY = mousePos.y - PADDLE_HEIGHT/2;
    });
    
    console.log('stop');
};
