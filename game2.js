var app = {};
var ball = {};
var playerOne = {};
var playerTwo = {};


function startApp() {
	app.canvas = getElementById('canvas');
	app.context = app.canvas.getContext('2d');

	//add eventlistener x2

	restartApp();
}

function restartApp(){
	ball.position.x = app.canvas.width / 2;
	ball.position.y = app.canvas.height / 2;

	playerOne.position.x = app.canvas.width * 0.9;
	playerOne.position.y = app.canvas.height / 2;

	playerTwo.position.x = app.canvas.width * 0.1;
	playerTwo.position.y = app.canvas.height / 2;
}

function frameRate(currentTime){
	
	drawAll();
}

function drawAll(){
	
}

function spawnBall(){

}

function spawnPlayerOne(){
	playerOne = {}
}