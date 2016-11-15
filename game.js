var app = {};

//debug toggle true/false;
// var debugOn = true;
// function debug(){
// 	if (debugOn){
// 		console.trace("debug: line number");
// 	}
// }



function drawObject(context, obj) {
    context.save();
    context.translate(obj.position.x, obj.position.y);
    context.fillStyle = obj.color;
    context.fillRect(-obj.size.width / 2, -obj.size.height / 2,
        obj.size.width, obj.size.height);
    context.restore();
}

function startApp(){
	app.canvas = document.getElementById('myCanvas');
	app.context = app.canvas.getContext('2d');

	restartGame();

	window.addEventListener('keydown', myKeyDown, false);
	window.addEventListener('keyup', myKeyUp, false);

	app.lastTime = window.performance.now();
	window.requestAnimationFrame(frameUpdate);
}

function restartGame(){
//set score = 0;
//ball speed = default;
	spawnBall();
	spawnPlayerOne();
	spawnPlayerTwo();
//ASK if vs AI or P2. spawn accordingly.
}

//ADD ARRAY TO ALLOW MULTIPLE INPUTS???
	// let multipleKeys = []

//if UP -> call P1 Up, then break
//if DOWN -> call P1 Down, then break
//if LEFT -> call P1 forehand tilt
//if RIGHT -> call P1 backhand tilt

//if W -> call P2 Up, then break
//if S -> call P2 down, then break
//if D -> call P2 forehand tilt
//if A -> call P2 backhand tilt

function myKeyDown(e){
  switch (e.keyCode) {
    case 38:
      playerOnePressUp();
      break;
    case 40:
      playerOnePressDown();
      break;

    case 87:
      playerTwoPressUp();
      break;
    case 83:
      playerTwoPressDown();
      break;
	}
}
function myKeyUp(e){
    switch (e.keyCode) {
      case 38:
        playerOneReleaseUp();
        break;
      case 40:
        playerOneReleaseDown();
        break;

      case 87:
        playerTwoReleaseUp();
        break;
      case 83:
        playerTwoReleaseDown();
        break;
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




function frameUpdate(timeStamp){
	window.requestAnimationFrame(frameUpdate);
	var deltaTime = (timeStamp - app.lastTime) / 1000;
	app.lastTime = timeStamp;

	app.ball.move();
	app.playerOne.move();
	app.playerTwo.move();
	drawScene();
}

function drawScene(){
	app.context.fillStyle="white";
	app.context.fillRect(0,0,app.canvas.width,app.canvas.height);

	app.ball.drawMe(app.context);
	app.playerOne.drawMe(app.context);
	app.playerTwo.drawMe(app.context);
}

function spawnBall(){
	app.ball = {
		position: {
			x: app.canvas.width / 2,
			y: app.canvas.height / 2
		},
		size: {
			height: 9,
			width: 9
		},
		color: '#000000',
		drawMe: function(context){
			drawObject(context, this);
		},
		move : function(){
			//ADD FUNCTION FOR BALL MOVEMENT.
		}
	}
}

function spawnPlayerOne(){
	app.playerOne = {
		position: {
			x: app.canvas.width - 30,
			y: app.canvas.height / 2
		},
		size: {
			width: 5,
			height: 100
		},
		color: '#0000FF',
		drawMe: function(context){
			drawObject(context, this);
		},
		move : function(){
			if(this.moveUp){
				this.position.y -= 10;
			}
			if(this.moveDown){
				this.position.y += 10;
			}
		}
	}
}

function spawnPlayerTwo(){
	app.playerTwo = {
		position: {
			x: app.canvas.width - 690,
			y: app.canvas.height / 2
		},
		size: {
			width: 5,
			height: 100
		},
		color: '#FF0000',
		drawMe: function(context){
			drawObject(context, this);
		},
		move : function(){
			if(this.moveUp){
				this.position.y -= 10;
			}
			if(this.moveDown){
				this.position.y += 10;
			}
		}
	}
}




// function restartGame(){
// }


//function vs AI or vs Player2?
//function spawn background

//function spawn ball

//function spawn paddles

//function draw all 

//function framerate???


//function event listeners (controls) WASD vs Directional keys.

//function keep score, update DOM (outside of canvas)

//funciton collision (and curve ball?)

//function power ups (optional)

//function game over (who wins?)

//function restart game?
//function reset score (then update DOM)


//add AI (track ball perfect with a % chance to not track ball well. 
//increase % for lower difficulty.)