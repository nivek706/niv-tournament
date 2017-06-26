
var repPlayerArray = nodecg.Replicant('playerArray');
var repTimerEnd = nodecg.Replicant('timerEnd');

repPlayerArray.on('change', function(oldValue, newValue) {
	var playerIndex = 0;
    console.log(repPlayerArray);
    runPlayerCarousel(repPlayerArray.value, 0);
});

nodecg.listenFor('startTimer', function() {
	//repTimerEnd should have been updated, so we'll just use that
	
	//countdown to a certain time (or countdown a set amount of time)
	initializeClock(repTimerEnd.value);
});

function runPlayerCarousel(playerArray, currPlayerIndex) {
    switchToPlayerInfo(playerArray[currPlayerIndex]);
    console.log('currPlayerIndex: ' + currPlayerIndex);
    console.log('playerArray.length ' + playerArray.length);
    if(currPlayerIndex === playerArray.length-1) {
        currPlayerIndex = 0;
    } else {
        currPlayerIndex += 1;
    }
    setTimeout(function () {
        runPlayerCarousel(playerArray, currPlayerIndex); 
    }, 20000);
}

function switchToPlayerInfo(playerInfoObj) {
    console.log('Switching to player: ' + playerInfoObj.name);
    
    $('#player-info-area')
			.animate({
				opacity: 0
			}, 500, function() {
				$('#player-name').html(playerInfoObj.name);
				$('#player-league').html(playerInfoObj.league);
				$('#player-race').html(playerInfoObj.race);
				$('#player-state').html(playerInfoObj.state);
				$('#player-social').html(playerInfoObj.social);
				$('#player-desc').html(playerInfoObj.description);
			})
			.delay(200);	
		
		$('#player-info-area')
			.animate({
				opacity: 1
			}, 500);
}

function getTimeRemaining(endtime){
  var t = endtime - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

//timeinterval needs to be outside of the initializeClock function because of scope
//otherwise, we're unable to clear any prior countdown (resulting in wonkiness)
var timeinterval;
function initializeClock(endtime){
	
	clearInterval(timeinterval);

	function updateClock(){
		var timeRemaining = getTimeRemaining(endtime);

		$('#minutes-span').html(('0' + timeRemaining.minutes).slice(-2));
		$('#seconds-span').html(('0' + timeRemaining.seconds).slice(-2));

		if(timeRemaining.total<=1000){
		  clearInterval(timeinterval);
		}
	}

	updateClock();
	timeinterval = setInterval(updateClock,1000);
}