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
