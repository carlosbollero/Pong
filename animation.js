
var canvas;
var canvasContext;

const FRAMESPERSECOND = 50;

const PADDLE_HEIGHT = 100;
const PADDLE_WIDHT = 10;
const PADDLE_PADDING = 20;
const PADDLE_POS_X = 0 + PADDLE_PADDING;
const PADDLE_2_POS_X = 800 - (PADDLE_PADDING + PADDLE_WIDHT);
var paddlePosY = 250;
var paddle2PosY = 250;

const BALLRADIUS = 5;
var ballWidth = 10;
var ballHeight = 10;
var ballRadius = 5;
var ballPosX;
var ballPosY;
var ballSpeedX = 5;
var ballSpeedY = 5;

function drawBall() {
    
    console.log("pos (" + ballPosX + "," + ballPosY + ")");
    console.log("size : " + ballWidth + "x" + ballHeight);
    drawCircle(ballPosX, ballPosY, BALLRADIUS, 'green');
}

function drawCircle(centerX, centerY, radius, color){
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function drawScenario() {
    drawRect(0, 0, canvas.width, canvas.height, 'black');
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
    drawScenario();
    drawPaddles();
    drawBall();
}

function moveBall() {
    
    ballPosX = ballPosX + ballSpeedX;
    ballPosY = ballPosY + ballSpeedY;
    
    if (ballPosX > canvas.width - ballWidth){
        ballSpeedX = -ballSpeedX;
    }
    
    if ((ballPosX - ballRadius <= PADDLE_POS_X + PADDLE_WIDHT) && ((ballPosY > paddlePosY) && (ballPosY < paddlePosY + PADDLE_HEIGHT))){
        ballSpeedX = -ballSpeedX;
    }
    
    if ( ballPosX < 0 + ballRadius) {
        ballSpeedX = -ballSpeedX;
        ballReset();
    }
    
    if (ballPosY > canvas.height - ballHeight){
        ballSpeedY = -ballSpeedY;
    }
    if (ballPosY < 0 + ballHeight){
        ballSpeedY = -ballSpeedY;   
    }
}

function ballReset() {
    ballPosX = canvas.width / 2;
    ballPosY = canvas.height / 2;
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
    draw();
}

window.onload = function () {
    
    console.log('init');
    canvas = document.getElementById('gameCanvas');
    canvasContext =  canvas.getContext('2d');
    
    ballReset();
    
    /*update();*/
    setInterval(update, 1000 / FRAMESPERSECOND);
    
    canvas.addEventListener('mousemove', 
                function (event){
                    var mousePos = getMousePos(event);
                    paddlePosY = mousePos.y - PADDLE_HEIGHT/2;
    });
    
    console.log('stop');
};
