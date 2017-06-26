(function() {
	'use strict';

	if (window.jQuery) {
		console.log("jQuery is loaded for niv-tournament.js");
	}

	// We like to target our buttons and inputs with `ctrl-` class names. However, you can use whatever you want!
	var fadeOut = document.getElementById('ctrl-fadeOut');
	var fadeIn = document.getElementById('ctrl-fadeIn');
	var updateMatchName = document.getElementById('ctrl-matchname');
	var updateCaster1 = document.getElementById('ctrl-updateCaster1');
	var updateCaster2 = document.getElementById('ctrl-updateCaster2');
	var updateCaster3 = document.getElementById('ctrl-updateCaster3');
	var populatePlayerData = document.getElementById('ctrl-populatePlayerData');
	var updatePlayer1 = document.getElementById('ctrl-updatePlayer1');
	var updatePlayer2 = document.getElementById('ctrl-updatePlayer2');

	var bestofSelector = $('#ctrl-bestofSelector');
	var updateAllMaps = document.getElementById('ctrl-updateAllMaps');
	var updateTimer = document.getElementById('ctrl-startTimer');


	var repMatchName = nodecg.Replicant('matchName');
	var repPlayer1 = nodecg.Replicant('player1');
	var repPlayer2 = nodecg.Replicant('player2');
	var repMapArray = nodecg.Replicant('maps');
	var repCaster1 = nodecg.Replicant('caster1');
	var repCaster2 = nodecg.Replicant('caster2');
	var repCaster3 = nodecg.Replicant('caster3');
	var repTimerEnd = nodecg.Replicant('timerEnd');
	var repPlayerArray = nodecg.Replicant('playerArray');

	//instantiate our playerList array
	var playerList = new PlayerListMWC13().contents;
	repPlayerArray.value = playerList;


	fadeOut.addEventListener('click', function() {
		nodecg.sendMessage('bgFadeOut');
		nodecg.log("fading out");
	});

	fadeIn.addEventListener('click', function() {
		nodecg.sendMessage('bgFadeIn');
	});

	updateMatchName.addEventListener('click', function() {
		repMatchName.value = document.getElementById('matchName').value;
	});

	updatePlayer1.addEventListener('click', function() {
		var player1Name = document.getElementById('player1Input').value;

		for (var i = 0; i < playerList.length; i++) {
			if (player1Name == playerList[i].name) {
				repPlayer1.value = playerList[i];
				return;
			} else { /* do nothing */ }
		}
		//if we get through the for loop without returning,
		//we've done something terribly wrong
		console.log("Could not find Player for name: " + player1Name);
	});

	updatePlayer2.addEventListener('click', function() {
		var player2Name = document.getElementById('player2Input').value;

		for (var i = 0; i < playerList.length; i++) {
			if (player2Name == playerList[i].name) {
				repPlayer2.value = playerList[i];
				return;
			} else { /* do nothing */ }
		}
		//if we get through the for loop without returning,
		//we've done something terribly wrong
		console.log("Could not find Player for name: " + player2Name);
	});

	updateAllMaps.addEventListener('click', function() {
		pushMapInfo();
	});

	updateCaster1.addEventListener('click', function() {
		var caster1Name = document.getElementById('caster1NameInput').value;
		var caster1Social = document.getElementById('caster1SocialInput').value;
		repCaster1.value = new Caster(caster1Name, caster1Social);
	});

	updateCaster2.addEventListener('click', function() {
		var caster2Name = document.getElementById('caster2NameInput').value;
		var caster2Social = document.getElementById('caster2SocialInput').value;
		repCaster2.value = new Caster(caster2Name, caster2Social);
	});

	updateCaster3.addEventListener('click', function() {
		var caster3Name = document.getElementById('caster3NameInput').value;
		var caster3Social = document.getElementById('caster3SocialInput').value;
		repCaster3.value = new Caster(caster3Name, caster3Social);
	});

	populatePlayerData.addEventListener('click', function() {
		var playerDataList = $("#players");
		playerDataList.empty();

		var playerNameDataString = "";
		for (var i = 0; i < playerList.length; i++) {
			//follow your heart
			//do some stuff
			//win the game
			playerNameDataString = playerNameDataString.concat("<option value=\"" + playerList[i].name + "\">");
		}
		playerDataList.append(playerNameDataString);
	});

	bestofSelector.change(function() {
		var mapList = $("#ctrl-mapList");
		mapList.empty();
		var bestOfNum = Number(bestofSelector.find(":selected").text());
		var mapInputString = "";
		for (var i = 1; i <= bestOfNum; i++) {
			mapInputString = mapInputString.concat("Map " + i + ": <input id=\"map" + i + "\" type=\"text\" list=\"mapNames\" value=\"Map TBD\">" +
				"<select id=\"map" + i + "WinnerSelector\" class=\"ctrl-map" + i + "1WinnerSelector\">" +
				"<option value=\"TBD\">---</option>" +
				"<option value=\"P1\">P1</option>" +
				"<option value=\"P2\">P2</option>" +
				"</select>" +
				/* "<button type=\"button\" id=\"map"+i+"Button\" class=\"ctrl-updateSingleMap btn btn-sm\">Update Map</button> */
				"</p>"
			);
		}
		mapList.append(mapInputString);

		pushMapInfo();

		/* this was me trying to add unique event listeners to each button....turns out that's pretty tough
		var j=0;
		for (i=1; i<=bestOfNum; i++) {
			//console.log("i is what? " + i);
			//setup event listener??
			$(".ctrl-mapList").on('click', '#map'+i+'Button', function() {
				var mapId = "map"+i;
				console.log("mapId: " + mapId);
				var mapName = document.getElementById(mapId).value;
				console.log("Test?: " + mapName);
			});
		} */
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

	function pushMapInfo() {
		//declare an array
		var mapArray = [];

		//fill that array with Maps
		var bestOfNum = Number(bestofSelector.find(":selected").text());
		for (var i = 1; i <= bestOfNum; i++) {
			var tmpMap = new Map(document.getElementById('map' + i).value, document.getElementById('map' + i + 'WinnerSelector').value);
			mapArray.push(tmpMap);
		}

		repMapArray.value = mapArray;
		//have a drink
	}

	repMatchName.on('change', function(oldValue, newValue) {
		console.log("matchName changed from " + oldValue + " to " + newValue);
	});
	repPlayer1.on('change', function(oldValue, newValue) {
		console.log("player1 changed from " + oldValue + " to " + newValue);
	});
	repPlayer2.on('change', function(oldValue, newValue) {
		console.log("player2 changed from " + oldValue + " to " + newValue);
	});
	repMapArray.on('change', function(oldValue, newValue) {
		console.log("mapArray changed from " + oldValue + " to " + newValue);
	});
	repCaster1.on('change', function(oldValue, newValue) {
		console.log("caster1 changed from " + oldValue + " to " + newValue);
	});
	repCaster2.on('change', function(oldValue, newValue) {
		console.log("caster2 changed from " + oldValue + " to " + newValue);
	});
	repCaster3.on('change', function(oldValue, newValue) {
		console.log("caster3 changed from " + oldValue + " to " + newValue);
	});
})();
