let app = {};

function startApp(){
	app.canvas = document.getElementById('gameCanvas');
	app.context = app.canvas.getContext('2d');
	app.lastTime = window.performance.now();
	window.requestAnimationFrame(frameUpdate);

	window.addEventListener('keydown', myKeyDown, false);
	window.addEventListener('keyup', myKeyUp, false);
	// window.addEventListener('click', mouseDown, false);

	restartGame();
}

function restartGame(){
	spawnBall();
	spawnPlayerOne();
	spawnPlayerTwo();
	updateScore();
}

function frameUpdate(timeStamp){
	window.requestAnimationFrame(frameUpdate);
	var deltaTime = (timeStamp - app.lastTime) / 1000;
	app.lastTime = timeStamp;
	// console.log(1/deltaTime); // view framerate in console

	bounceWall();
	bouncePaddle();

	app.ball.move();
	app.playerOne.move();
	app.playerTwo.move();
	app.context.clearRect(0, 0, app.canvas.width, app.canvas.height);

	drawScene();
}

function drawScene(){
	app.context.fillStyle="white";
	app.context.fillRect(0,0,app.canvas.width,app.canvas.height);

	// app.context.moveTo(app.canvas.width/2, 0);  	//test middle line
	// app.context.lineTo(app.canvas.width/2, app.canvas.height);  	//test middle line
	// app.context.stroke();  	//test middle line

	app.ball.drawMe(app.context);
	app.playerOne.drawMe(app.context);
	app.playerTwo.drawMe(app.context);
}

function bounceWall(){
// ball hits top or bottom wall -> bounce
	if (app.ball.position.y >= (app.canvas.height - app.ball.radius)){
		app.ball.position.y = (app.canvas.height - app.ball.radius - 1);
		app.ball.speed.y = -(app.ball.speed.y);
	}
	if (app.ball.position.y <= app.ball.radius){
		app.ball.position.y = (app.ball.radius + 1);
		app.ball.speed.y = -(app.ball.speed.y);
	}
// ball hits right wall -> P2 scores, serve to P2
	if (app.ball.position.x >= (app.canvas.width - app.ball.radius)){
		app.playerTwo.score += 1;
		updateScore();
		spawnBall();
		app.ball.speed.x = -(app.ball.speed.x);
	}
// ball hits left wall -> P1 scores, serve to P1
	if (app.ball.position.x <= app.ball.radius){
		app.playerOne.score += 1;
		updateScore();
		spawnBall();
	}
}

function updateScore(){
	document.getElementById('score').innerHTML = (app.playerTwo.score + ' - ' + app.playerOne.score);
}

function bouncePaddle(){
	let distFromP1Center = (app.ball.position.y - app.playerOne.position.y);
	let distFromP2Center = (app.ball.position.y - app.playerTwo.position.y);

// ball hits top half of P1 -> curve down
	if(app.ball.position.x + app.ball.radius < app.playerOne.position.x + app.playerOne.size.width / 2 &&
	   app.ball.position.x + app.ball.radius > app.playerOne.position.x - app.playerOne.size.width / 2 &&
	   app.ball.position.y > app.playerOne.position.y - app.playerOne.size.height / 2 &&
	   app.ball.position.y <= app.playerOne.position.y)
	{
		// increaseSpeed(app.ball.speed.x);  //ignore this for now, testing new function.
		app.ball.speed.x = -(app.ball.speed.x * app.ball.multiplier);
		// increase/decrease angle based on ball distance from center paddle.
		app.ball.speed.y = (distFromP1Center * 0.15);
		// apply downward curve if ball hits upper half of paddle.
		app.ball.curve = 'down';
	}
// ball hits bottom half of P1 -> curve up
	if(app.ball.position.x + app.ball.radius < app.playerOne.position.x + app.playerOne.size.width / 2 &&
	   app.ball.position.x + app.ball.radius > app.playerOne.position.x - app.playerOne.size.width / 2 &&
	   app.ball.position.y < app.playerOne.position.y + app.playerOne.size.height / 2 &&
	   app.ball.position.y > app.playerOne.position.y)
	{
		app.ball.speed.x = -(app.ball.speed.x * app.ball.multiplier);
		app.ball.speed.y = (distFromP1Center * 0.15);
		app.ball.curve = 'up';
	}
// ball hits top half of P2 -> curve down
	if(app.ball.position.x - app.ball.radius > app.playerTwo.position.x - app.playerTwo.size.width / 2 &&
	   app.ball.position.x - app.ball.radius < app.playerTwo.position.x + app.playerTwo.size.width / 2 &&
	   app.ball.position.y > app.playerTwo.position.y - app.playerTwo.size.height / 2 &&
	   app.ball.position.y < app.playerTwo.position.y)
	{
		app.ball.speed.x = -(app.ball.speed.x * app.ball.multiplier);
		app.ball.speed.y = (distFromP2Center * 0.15);
		app.ball.curve = 'down';
	}
// ball hits bottom half of P2 -> curve up
	if(app.ball.position.x - app.ball.radius > app.playerTwo.position.x - app.playerTwo.size.width / 2 &&
	   app.ball.position.x - app.ball.radius < app.playerTwo.position.x + app.playerTwo.size.width / 2 &&
	   app.ball.position.y < app.playerTwo.position.y + app.playerTwo.size.height / 2 &&
	   app.ball.position.y >= app.playerTwo.position.y)
	{
		app.ball.speed.x = -(app.ball.speed.x * app.ball.multiplier);
		app.ball.speed.y = (distFromP2Center * 0.15);
		app.ball.curve = 'up';
	}
}

// function increaseSpeed(currentSpeed){
// 	if (currentSpeed > 0 && Math.abs(currentSpeed) < app.ball.speed.max){
// 		currentSpeed = -(currentSpeed + 0.4);
// 	}
// 	else if (currentSpeed < 0 && Math.abs(currentSpeed) < app.ball.speed.max){
// 		currentSpeed = -(currentSpeed - 0.4);
// 	}
// 	else {
// 		currentSpeed = -(currentSpeed);
// 	}
// }

function spawnBall(){
	app.ball = {
		position: {
			x: app.canvas.width / 2,
			y: app.canvas.height / 2
		},
		speed: {
			max: 9,
			x: 7,
			y: (Math.random() * 2) - 1
		},
		curve: 'straight',
		multiplier: 1,
		radius: 5,
		color: '#000000',
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
		color: '#0000FF',
		drawMe: function(context){
			drawPaddle(context, this);
		},
		move : function(){
			if(this.moveUp && this.position.y > app.playerOne.size.height / 2){   //52
				this.position.y -= 8;
			}
			if(this.moveDown && this.position.y < app.canvas.height - (app.playerOne.size.height / 2) ){     //352
				this.position.y += 8;
			}
		}
	}
}

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
		color: '#FF0000',
		drawMe: function(context){
			drawPaddle(context, this);
		},
		move : function(){
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

function drawPaddle(context, obj) {
    context.save();
    context.translate(obj.position.x, obj.position.y);
    context.fillStyle = obj.color;
    context.fillRect(-obj.size.width / 2, -obj.size.height / 2,
        obj.size.width, obj.size.height);
    context.restore();
}

function drawBall(context, obj) {
    context.save();
    context.translate(obj.position.x, obj.position.y);
    context.fillStyle = obj.color;
    context.stroke();
    context.beginPath();
    context.arc(0, 0, obj.radius, 0, (2 * Math.PI));
    // context.fill();
    context.restore();
}


function myKeyDown(e){
	if (e.keyCode === 38){
		playerOnePressUp();
	}
	else if (e.keyCode === 40){
		playerOnePressDown();
	}
//add playerOne LEFT and RIGHT input

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
