//click 1p or 2p
$('#twoPlayerButton').click(pickTwoPlayer);
$('#onePlayerButton').click(pickOnePlayer);
function pickOnePlayer(){
	$('#menuCanvas').hide();
	startApp();
	startAI();
}
function pickTwoPlayer(){
	$('#menuCanvas').hide();
	startApp();
}


function playSound(soundID) {
    var mySound=document.getElementById(soundID);
    mySound.play();
}

function stopSound(soundID) {
    var mySound=document.getElementById(soundID);
    mySound.pause();
    mySound.currentTime = 0;
}