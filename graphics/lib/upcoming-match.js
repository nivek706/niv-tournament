(function() {
	'use strict';

	var repMatchName = nodecg.Replicant('matchName');
	var repPlayer1 = nodecg.Replicant('player1');
	var repPlayer2 = nodecg.Replicant('player2');
	var repMapArray = nodecg.Replicant('maps');
	var repCaster1 = nodecg.Replicant('caster1');
	var repCaster2 = nodecg.Replicant('caster2');


	//create our mapInfoMap
	var mapInfoMap = {};
	mapInfoMap["Apotheosis"] = "img/apotheosis.jpg";
	mapInfoMap["Dasan Station"] = "img/dasan-station.jpg";
	mapInfoMap["Frozen Temple"] = "img/frozen-temple.jpg";
	mapInfoMap["Galactic Process"] = "img/galactic-process.jpg";
	mapInfoMap["King Sejong Station"] = "img/king-sejong-station.jpg";
	mapInfoMap["New Gettysburg"] = "img/new-gettysburg.jpg";
	mapInfoMap["Frost"] = "img/frost.jpg";
	mapInfoMap["Map TBD"] = "img/mapTBD.png";


	// The NodeCG API is automatically injected, and we can use it right away
	nodecg.listenFor('bgFadeOut', function() {
		$('.matchinfo-area').animate({
			opacity: 0
		}, 800);
	});

	nodecg.listenFor('bgFadeIn', function() {
		$('.matchinfo-area').animate({
			opacity: 1
		}, 800);
	});

	repMatchName.on('change', function(oldValue, newValue) {
		console.log("matchName changed from " + oldValue + " to " + newValue);
		$('#match-name').html(repMatchName.value);
	});
	repPlayer1.on('change', function(oldValue, newValue) {
		console.log("player1 changed from " + oldValue + " to " + newValue);
		var player1 = repPlayer1.value;
		if (player1 == null) {
			return;
		}
		$('.player1-textarea')
			.animate({
				opacity: 0
			}, 500, function() {
				$('#player1-number').html("P1");
				$('#player1-name').html(player1.name);
				$('#player1-league').html(player1.league);
				$('#player1-race').html(player1.race);
				$('#player1-state').html(player1.state);
				$('#player1-social').html(player1.social);
				$('#player1-desc').html(player1.description);
			})
			.delay(200);

		$('.player1-textarea')
			.animate({
				opacity: 1
			}, 500);
	});

	repPlayer2.on('change', function(oldValue, newValue) {
		console.log("player2 changed from " + oldValue + " to " + newValue);
		var player2 = repPlayer2.value;
		if (player2 == null) {
			return;
		}
		$('.player2-textarea')
			.animate({
				opacity: 0
			}, 500, function() {
				$('#player2-number').html("P2");
				$('#player2-name').html(player2.name);
				$('#player2-league').html(player2.league);
				$('#player2-race').html(player2.race);
				$('#player2-state').html(player2.state);
				$('#player2-social').html(player2.social);
				$('#player2-desc').html(player2.description);
			})
			.delay(200);

		$('.player2-textarea')
			.animate({
				opacity: 1
			}, 500);
	});
	repMapArray.on('change', function(oldValue, newValue) {
		console.log("mapArray changed from " + oldValue + " to " + newValue);
		var mapArray = repMapArray.value;
		var i;
		for (i = 0; i < mapArray.length; i++) {
			console.log(mapInfoMap[mapArray[i].name]);
		}

		var mapList = $('#mapList');
		mapList.empty();
		var mapNum = mapArray.length;
		for (i = 0; i < mapNum; i++) {
			var mapListString =
				"<li>" +
				"<div class=\"mapPanel\" id=\"map" + i + "\">" +
				"<img src=\"" + mapInfoMap[mapArray[i].name] + "\"><br>" +
				mapArray[i].name + "<br>" +
				"Winner: " + mapArray[i].winner +
				"</div>" +
				"</li>	";
			mapList.append(mapListString);
		}
	});
	repCaster1.on('change', function(oldValue, newValue) {
		console.log("caster1 changed from " + oldValue + " to " + newValue);
		var caster1 = repCaster1.value;
		if (caster1 == null) {
			return;
		}
		$('#caster1-text')
			.animate({
				opacity: 0
			}, 500, function() {
				$('#caster1-name').html(caster1.name);
				$('#caster1-social').html(caster1.social);
			})
			.delay(200);

		$('#caster1-text')
			.animate({
				opacity: 1
			}, 500);
	});
	repCaster2.on('change', function(oldValue, newValue) {
		console.log("caster2 changed from " + oldValue + " to " + newValue);
		var caster2 = repCaster2.value;
		if (caster2 == null) {
			return;
		}
		$('#caster2-text')
			.animate({
				opacity: 0
			}, 500, function() {
				$('#caster2-name').html(caster2.name);
				$('#caster2-social').html(caster2.social);
			})
			.delay(200);

		$('#caster2-text')
			.animate({
				opacity: 1
			}, 500);
	});
})();
