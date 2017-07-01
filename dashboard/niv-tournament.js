(function() {
	'use strict';

	if (window.jQuery) {
		console.log("jQuery is loaded for niv-tournament.js");
	}

	// We like to target our buttons and inputs with `ctrl-` class names. However, you can use whatever you want!
	var updateMatchName = document.getElementById('ctrl-matchname');
	var updateCasterNames = document.getElementById('ctrl-casterNames');
	var updateTimer = document.getElementById('ctrl-startTimer');

	var repMatchName = nodecg.Replicant('matchName');
	var repTimerEnd = nodecg.Replicant('timerEnd');
	var repCasterNames = nodecg.Replicant('casterNames');


	updateMatchName.addEventListener('click', function() {
		repMatchName.value = document.getElementById('matchName').value;
	});

	updateCasterNames.addEventListener('click', function() {
		repCasterNames.value = document.getElementById('casterNames').value;
	});


	updateTimer.addEventListener('click', function() {
		//get the current time
		var currentTimestamp = Date.now();
		console.log("current time: " + currentTimestamp);


		//depending on what radio button was selected, add the countdowm time (in ms)
		//and set to repTimerEnd.value
		var countdownTime = $('input[name=radioTime]:checked').val();
		if (countdownTime == null) {
			//do nothing
			return;
		} else if (countdownTime == 'custom') {
			//set countdownTime to the value in the custom field
			countdownTime = document.getElementById('customTime').value * 60 * 1000;
		}

		repTimerEnd.value = parseFloat(currentTimestamp) + parseFloat(countdownTime);
		console.log("timer end: " + repTimerEnd.value);
		nodecg.sendMessage('startTimer');
	});

	repMatchName.on('change', function(oldValue, newValue) {
		console.log("matchName changed from " + oldValue + " to " + newValue);
	});
	repCasterNames.on('change', function(oldValue, newValue) {
		console.log("CasterNames changed from " + oldValue + " to " + newValue);
	});
})();
