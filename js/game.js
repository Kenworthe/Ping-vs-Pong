$(document).ready(function(){
	console.log("Document ready->game.js launched")
	startApp();
})

let app = {};

function startApp(){
	app.canvas = $('#gameCanvas')[0];
	app.canvas.focus();
	app.context = app.canvas.getContext('2d');
	app.lastTime = window.performance.now();
	window.requestAnimationFrame(frameUpdate);

	app.canvas.addEventListener('keydown', myKeyDown, false);
	app.canvas.addEventListener('keyup', myKeyUp, false);

	endGame(); //starts game in a "paused" state
}

//resets and pauses game. then unhides menuCanvas.
function endGame(){
	spawnBall();
	centerBall();
	spawnPlayerOne();
	spawnPlayerTwo();
	updateScore();
	$('#menuCanvas').show();
}

//this current AI is just temporary. It moves slightly slower than P1.
function startAI(){
	app.playerTwo.move = function(){
		if (this.position.y > app.ball.position.y 
			&& this.position.y > this.size.height / 2){
			this.position.y -= 4;
		}
		if (this.position.y < app.ball.position.y
			&& this.position.y < app.canvas.height - (this.size.height / 2)){
			this.position.y += 4;
		}
	}
}

//resets positions and starts ball move after delay.
function restartGame(){
	spawnBall(1);
	centerBall();
	setTimeout(spawnBall, 2200, 1);
	spawnPlayerOne();
	spawnPlayerTwo();
	updateScore();
}

//main game loop.
function frameUpdate(timeStamp){
	window.requestAnimationFrame(frameUpdate);
	var deltaTime = (timeStamp - app.lastTime) / 1000;
	app.lastTime = timeStamp;

	bounceWall();
	bouncePaddle();

	app.ball.move();
	app.playerOne.move();
	app.playerTwo.move();

	app.context.clearRect(0, 0, app.canvas.width, app.canvas.height);
	drawScene();
}

//draws all canvas objects
function drawScene(){
	app.context.fillStyle="transparent";
	app.context.fillRect(0,0, app.canvas.width, app.canvas.height);

	// app.context.fillStyle="rgba(0,0,0,.1)";
	// app.context.fillRect(0,0,app.canvas.width,app.canvas.height); //add ball trail

	app.ball.drawMe(app.context);
	app.playerOne.drawMe(app.context);
	app.playerTwo.drawMe(app.context);
}

//play sound and pause sound functions
function playSound(soundID){
    var mySound = document.getElementById(soundID);
    mySound.play();
}
function stopSound(soundID){
    var mySound = document.getElementById(soundID);
    mySound.pause();
    mySound.currentTime = 0;
}

function bounceWall(){
// ball hits top or bottom wall -> negate y speed
	if (app.ball.position.y >= (app.canvas.height - app.ball.radius)){
		app.ball.position.y = (app.canvas.height - app.ball.radius - 1);
		app.ball.speed.y = -(app.ball.speed.y);
		playSound('wallSound');
	}
	if (app.ball.position.y <= app.ball.radius){
		app.ball.position.y = (app.ball.radius + 1);
		app.ball.speed.y = -(app.ball.speed.y);
		playSound('wallSound');
	}
// ball hits right wall -> P2 scores, serve to P2
	if (app.ball.position.x >= (app.canvas.width - app.ball.radius)){
		playSound('scoreSound');
		centerBall();
		app.playerTwo.score += 1;
		updateScore();
		setTimeout(spawnBall, 1000, -1);
	}
// ball hits left wall -> P1 scores, serve to P1
	if (app.ball.position.x <= app.ball.radius){
		playSound('scoreSound');
		centerBall();
		app.playerOne.score += 1;
		updateScore();
		setTimeout(spawnBall, 1000, 1);
	}
}

function updateScore(){
	$('#playerOneScore').html(app.playerOne.score);
	$('#playerTwoScore').html(app.playerTwo.score);
}
function centerBall(){
	app.ball.position.x = app.canvas.width / 2;
	app.ball.position.y = app.canvas.height / 2;
	app.ball.speed.x = 0;
	app.ball.speed.y = 0;
	app.ball.curve = 'straight';
}

function bouncePaddle(){
// ball hits top half of P1 -> curve down
	if(app.ball.position.x + app.ball.radius < app.playerOne.position.x + app.playerOne.size.width / 2 &&
	   app.ball.position.x + app.ball.radius > app.playerOne.position.x - app.playerOne.size.width / 2 &&
	   app.ball.position.y > app.playerOne.position.y - app.playerOne.size.height / 2 &&
	   app.ball.position.y <= app.playerOne.position.y)
	{
		// increase speed (up to max) then negate.
		// increase/decrease angle based on ball distance from center paddle.
		// apply downward curve if ball hits upper half of paddle.
		calculateNewSpeed(app.ball.speed.x);
		calculateNewCurve('down', app.playerOne.position.y);
		playSound('playerOneSound');
	}
// ball hits bottom half of P1 -> curve up
	if(app.ball.position.x + app.ball.radius < app.playerOne.position.x + app.playerOne.size.width / 2 &&
	   app.ball.position.x + app.ball.radius > app.playerOne.position.x - app.playerOne.size.width / 2 &&
	   app.ball.position.y < app.playerOne.position.y + app.playerOne.size.height / 2 &&
	   app.ball.position.y > app.playerOne.position.y)
	{
		calculateNewSpeed(app.ball.speed.x);
		calculateNewCurve('up', app.playerOne.position.y);
		playSound('playerOneSound');
	}
// ball hits top half of P2 -> curve down
	if(app.ball.position.x - app.ball.radius > app.playerTwo.position.x - app.playerTwo.size.width / 2 &&
	   app.ball.position.x - app.ball.radius < app.playerTwo.position.x + app.playerTwo.size.width / 2 &&
	   app.ball.position.y > app.playerTwo.position.y - app.playerTwo.size.height / 2 &&
	   app.ball.position.y < app.playerTwo.position.y)
	{
		calculateNewSpeed(app.ball.speed.x);
		calculateNewCurve('down', app.playerTwo.position.y);
		playSound('playerTwoSound');
	}
// ball hits bottom half of P2 -> curve up
	if(app.ball.position.x - app.ball.radius > app.playerTwo.position.x - app.playerTwo.size.width / 2 &&
	   app.ball.position.x - app.ball.radius < app.playerTwo.position.x + app.playerTwo.size.width / 2 &&
	   app.ball.position.y < app.playerTwo.position.y + app.playerTwo.size.height / 2 &&
	   app.ball.position.y >= app.playerTwo.position.y)
	{
		calculateNewSpeed(app.ball.speed.x);
		calculateNewCurve('up', app.playerTwo.position.y);
		playSound('playerTwoSound');
	}
}

function calculateNewSpeed(currentSpeed){
	if (currentSpeed > 0 && Math.abs(currentSpeed) <= app.ball.speed.max){
		currentSpeed += 0.25;
	}
	else if (currentSpeed < 0 && Math.abs(currentSpeed) <= app.ball.speed.max){
		currentSpeed -= 0.25;
	}
	app.ball.speed.x = -(currentSpeed);
}
function calculateNewCurve(curveUpOrDown, playerPositionY){
	let distFromCenter = (app.ball.position.y - playerPositionY);
	app.ball.speed.y = (distFromCenter * 0.15);
	app.ball.curve = curveUpOrDown;
}

//constructor for ball
function spawnBall(oneOrNegOne){
	app.ball = {
		position: {
			x: app.canvas.width / 2,
			y: app.canvas.height / 2
		},
		speed: {
			max: 8.25, //cannot surpass 9
			base: 5,
			x: oneOrNegOne * 5,   //recommend base speed 4-6
			y: (Math.random() * 2) - 1
		},
		curve: 'straight',
		multiplier: 1,   //not in use due to bug when app.ball.speed.x > 9
		radius: 5,
		color: '#FFFFFF',
		drawMe: function(context){
			drawBall(context, this);
		},
		move : function(){
			if(this.curve === 'down'){
				this.speed.y += .1;
			};
			if(this.curve === 'up'){
				this.speed.y -= .1;
			}
			this.position.x += this.speed.x;
			this.position.y += this.speed.y;
		}
	}
}

//constructor for P1
function spawnPlayerOne(){
	app.playerOne = {
		score: 0,
		position: {
			x: app.canvas.width - 30,
			y: app.canvas.height / 2
		},
		size: {
			width: 8,
			height: 80
		},
		color: '#29D7FE',
		drawMe: function(context){
			drawPaddle(context, this);
		},
		move : function(){
			if(this.moveUp && this.position.y > app.playerOne.size.height / 2){
				this.position.y -= 8;
			}
			if(this.moveDown && this.position.y < app.canvas.height - (app.playerOne.size.height / 2) ){
				this.position.y += 8;
			}
		}
	}
}

//constructor for P2
function spawnPlayerTwo(){
	app.playerTwo = {
		score: 0,
		position: {
			x: app.canvas.width - 690,
			y: app.canvas.height / 2
		},
		size: {
			width: 8,
			height: 80
		},
		color: '#EB00AF',
		drawMe: function(context){
			drawPaddle(context, this);
		},
		move : function(){
			// if AI is active, change this function.
			// this.position.y = app.ball.position.y; //for AI use.
			if(this.moveUp && this.position.y > app.playerTwo.size.height / 2){
				this.position.y -= 8;
			}
			if(this.moveDown && this.position.y < app.canvas.height - (app.playerTwo.size.height / 2)){
				this.position.y += 8;
			}
		}
	}
}

// P1/P2 draws itself
function drawPaddle(context, obj) {
    context.save();
    context.translate(obj.position.x, obj.position.y);
    context.fillStyle = obj.color;
    context.fillRect(-obj.size.width / 2, -obj.size.height / 2,
        obj.size.width, obj.size.height);
    context.restore();
}

// ball draws itself
function drawBall(context, obj) {
    context.save();
    context.translate(obj.position.x, obj.position.y);
    context.fillStyle = obj.color;
    context.fill();
    context.strokeStyle = obj.color;
    context.stroke();
    context.beginPath();
    context.arc(0, 0, obj.radius, 0, (2 * Math.PI));
    
    context.restore();
}

// button inputs
function myKeyDown(e){
	if (e.keyCode === 38){
		e.preventDefault();
		playerOnePressUp();
	}
	else if (e.keyCode === 40){
		e.preventDefault();
		playerOnePressDown();
	}

	else if (e.keyCode === 87){
		playerTwoPressUp();
	}
	else if (e.keyCode === 83){
		playerTwoPressDown();
	}
}

function myKeyUp(e){
	if (e.keyCode === 38){
		playerOneReleaseUp();
	}
	else if (e.keyCode === 40){
		playerOneReleaseDown();
	}
	else if (e.keyCode === 87){
		playerTwoReleaseUp();
	}
	else if (e.keyCode === 83){
		playerTwoReleaseDown();
	}
}

//playerOne
function playerOnePressUp() {
	app.playerOne.moveUp = true;
}
function playerOnePressDown() {
	app.playerOne.moveDown = true;
}
function playerOneReleaseUp() {
	app.playerOne.moveUp = false;
}
function playerOneReleaseDown() {
	app.playerOne.moveDown = false;
}

//playerTwo
function playerTwoPressUp() {
	app.playerTwo.moveUp = true;
}
function playerTwoPressDown() {
	app.playerTwo.moveDown = true;
}
function playerTwoReleaseUp() {
	app.playerTwo.moveUp = false;
}
function playerTwoReleaseDown() {
	app.playerTwo.moveDown = false;
}
