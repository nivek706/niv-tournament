
var repPlayerArray = nodecg.Replicant('playerArray');
var repTimerEnd = nodecg.Replicant('timerEnd');

repPlayerArray.on('change', function(oldValue, newValue) {
	//start the carousel a-rollin'
	
});

nodecg.listenFor('startTimer', function() {
	//repTimerEnd should have been updated, so we'll just use that
	
	//countdown to a certain time (or countdown a set amount of time)
	initializeClock(repTimerEnd.value);
});


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
		var t = getTimeRemaining(endtime);

		$('#minutes-span').html(('0' + t.minutes).slice(-2));
		$('#seconds-span').html(('0' + t.seconds).slice(-2));

		if(t.total<=1000){
		  clearInterval(timeinterval);
		}
	}

	updateClock();
	timeinterval = setInterval(updateClock,1000);
}