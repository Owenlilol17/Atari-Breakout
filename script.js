var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleDx = 7;

var rightPressed;
var leftPressed;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var brick = [];
for (var c = 0; c < brickColumnCount; c++) {
    brick[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        brick[c][r] = { x: 0, y: 0, status: 1 };
    }
}

brickColumnCount

// If chosen keydown, set right/leftPressed to true.
function keyDownHandler(event) {
    if (event.key == "Right" || event.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (event.key == "Left" || event.key == "ArrowLeft") {
        leftPressed = true;
    }
}

// If chosen keydown, set right/leftPressed to true.
function keyUpHandler(event) {
    if (event.key == "Right" || event.key == "ArrowRight") {
        rightPressed = false
    }
    else if (event.key == "Left" || event.key == "ArrowLeft") {
        leftPressed = false
    }
}

// Listens to events keydown, keyup
document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

// Function to draw a ball.
function drawBall() {
    ctx.beginPath();
    /* (x, y) refers to the position of the center of the
    arc. ballRadius decides how big the ball is. Math.PI * 2
    decides how much of a circle is to be shown.
    */
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Function to draw a paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Function to draw bricks
function drawBrick() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (brick[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding) + brickOffsetLeft);
                var brickY = (r * (brickHeight + brickPadding) + brickOffsetTop);
                brick[c][r].x = brickX;
                brick[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Function for detecting collision
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = brick[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}

// Function to draw shapes on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawBrick();
    drawBall();
    drawPaddle();
    collisionDetection();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius ||
        (
            x + dx > paddleX &&
            x + dx < paddleX + paddleWidth &&
            y + dy > canvas.height - paddleHeight - ballRadius
        )
    ) {
        dy = -dy;
    }

    if (rightPressed && (paddleX + paddleWidth) < canvas.width) {
        paddleX += paddleDx;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= paddleDx;
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}
draw();