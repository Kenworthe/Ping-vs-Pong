let menu = {};

function startMenu(){

}

$('#twoPlayerButton').click(pickTwoPlayer);
$('#onePlayerButton').click(pickOnePlayer);

function pickOnePlayer(){
	$('#menuCanvas').hide();
	startApp();
}

function pickTwoPlayer(){
	$('#menuCanvas').hide();
	startApp();
}

// function startMenu(){
// 	menu.canvas = document.getElementById('menuCanvas');
// 	menu.context = menu.canvas.getContext('2d');
// 	// window.addEventListener('click', mouseDown, false);

// 	menu.context.fillStyle="white";
// 	menu.context.fillRect(0, 0, menu.canvas.width, menu.canvas.height);

// 	spawnStartButton();
// 	// spawnBall();
// 	drawStartButton(menu.context, menu.startButton);
// 	app.ball.drawMe(context);

// }

// function spawnStartButton(){
// 	menu.startButton = {
// 		position: {
// 			x: menu.canvas.width / 2,
// 			y: menu.canvas.height / 2
// 		},
// 		size: {
// 			width: 200,
// 			height: 60
// 		},
// 		fontColor: 'black',
// 		color: 'black'
// 	}
// }

// function spawnBall(){
// 	app.ball = {
// 		position: {
// 			x: app.canvas.width / 2,
// 			y: app.canvas.height / 2
// 		},
// 		radius: 5,
// 		color: '#000000',
// 		drawMe: function(context){
// 			drawBall(context, this);
// 		},
// 		move : function(){
// 			if(this.curve === 'down'){
// 				this.speed.y += .1;
// 			};
// 			if(this.curve === 'up'){
// 				this.speed.y -= .1;
// 			}
// 			this.position.x += this.speed.x;
// 			this.position.y += this.speed.y;
// 		}
// 	}
// }


// function drawStartButton(context, obj) {
//     context.save();
// // draw rectangle
//     context.translate(obj.position.x, obj.position.y);
//     context.lineWidth = 2;
//     context.strokeStyle = (obj.color);
//     context.strokeRect(-obj.size.width / 2, -obj.size.height / 2, obj.size.width, obj.size.height);
// // draw text
//     context.fillStyle = obj.fontColor;
//     context.font = '30px Arial';
//     context.textAlign = 'center';
//     context.textBaseline = 'middle';
//     context.fillText('New Game', 0, 0);
//     context.restore();
// }

// function drawBall(context, obj) {
//     context.save();
//     context.translate(obj.position.x, obj.position.y);
//     context.fillStyle = obj.color;
//     context.stroke();
//     context.beginPath();
//     context.arc(0, 0, obj.radius, 0, (2 * Math.PI));
//     // context.fill();
//     context.restore();
// }

// function drawStartButton(context, obj){
// 	context.save();
// 	context.translate();
// 	context.fillStyle();
// 	context.fillRect();
//  context.fillText('',,);
// 	context.restore();
// }

// function askPlayers(){
// ask One player or two player
// restartGame();
// }
