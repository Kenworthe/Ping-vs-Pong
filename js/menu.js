// start app functions click 1p or 2p
$('#twoPlayerButton').click(pickTwoPlayer);
$('#onePlayerButton').click(pickOnePlayer);

//start one player mode
function pickOnePlayer(){
	$('#menuCanvas').hide();
	$('#gameCanvas').focus();
	restartGame();
	startAI();
}
//start two player mode
function pickTwoPlayer(){
	$('#menuCanvas').hide();
	$('#gameCanvas').focus();
	restartGame();
}

// start new game -> endgame and change menu text
$('#newGameButton').click(function(){
	clearTimeout(spawnBall);
	setTimeout(centerBall);
	endGame();
	$('div.modal').hide();
	$('#menuButton').text("Menu");
});

// sounds for open or close menu modal
$('#menuButton').mouseenter(function() {
	playSound('menuHoverSound');
});
$('#menuButton').click(function() {
	$('div.modal').toggle();
	if ($('#menuButton').text().toLowerCase() == "menu"){
		$('#menuButton').text("Close");
		$('#gameCanvas').focus();
		playSound('menuClickSound');
	}
	else {
		$('#menuButton').text("Menu");
		$('#gameCanvas').focus();
		playSound('scoreSound');
	}
});

// sounds for mute or unmute bg music
$('#muteButton').mouseenter(function() {
	playSound('menuHoverSound');
});
$('#muteButton').click(function() {
	if ($('#muteButton').text().toLowerCase() == "mute"){
		$('#muteButton').text("Unmute");
		$('#gameCanvas').focus();
		playSound('menuClickSound');
		stopSound('backgroundMusic');
	}
	else {
		$('#muteButton').text("Mute");
		$('#gameCanvas').focus();
		playSound('scoreSound');
		playSound('backgroundMusic');
	}
});

// menu hover and click sounds.
$('.hoverbutton').mouseenter(function() {
	playSound('menuHoverSound');
});
$('.hoverbutton').click(function() {
	playSound('menuClickSound');
});