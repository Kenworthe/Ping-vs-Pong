var app = {};

//debug toggle true/false;
function debug (){

}


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

//	window.addEventListener();
//	window.addEventListener();

	app.lastTime = window.performance.now();
	window.requestAnimationFrame(frameUpdate);
}

function restartGame(){
//set score = 0;
//ball speed = default;
//	spawnBall();
	spawnPlayerOne();
	//ASK if vs AI or P2. spawn accordingly.
	spawnPlayerTwo();
}

function frameUpdate(timeStamp){
	window.requestAnimationFrame(frameUpdate);
	var deltaTime = (timeStamp - app.lastTime) / 1000;
	app.lastTime = timeStamp;

//	app.ball.move();
	app.playerOne.move();
	app.playerTwo.move();
	drawScene();
}

function drawScene(){
	app.context.fillStyle="lightgrey";
	app.context.fillRect(0,0,app.canvas.width,app.canvas.height);

//	app.ball.drawMe(app.context);
	app.playerOne.drawMe(app.context);
	app.playerTwo.drawMe(app.context);
}

function spawnPlayerOne(){
	app.playerOne = {
		position: {
				x: app.canvas.width - 690,
				y: app.canvas.height / 2
		},

		size: {
			height: 100,
			width: 5
		},

		color: '#0000FF',

		drawMe: function(context){
			drawObject(context, this);
		},

		move : function(){
			if(this.moveUp){
				this.position.y += 10;
			}
			if(this.moveDown){
				this.position.y -= 10;
			}
		}


	}
}

function spawnPlayerTwo(){
	app.playerTwo = {
		position: {
				x: app.canvas.width - 30,
				y: app.canvas.height / 2
		},

		size: {
			height: 100,
			width: 5
		},

		color: '#FF0000',

		drawMe: function(context){
			drawObject(context, this);
		},

		move : function(){
			if(this.moveUp){
				this.position.y += 10;
			}
			if(this.moveDown){
				this.position.y -= 10;
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


//add AI (track ball perfect with a % chance to not track ball well. increase % for lower difficulty.)