'use strict';

if (window.jQuery) {
	console.log("jQuery is loaded for niv-tournament.js");
}

// var repChallongeConnector = nodecg.Replicant('ChallongeConnector');
// nodecg.sendMessage('getTournaments');
// repChallongeConnector.on('change', function(newValue, oldValue) {
// 	console.log("challonge oldValue: " + oldValue);
// 	console.log("challonge newvalue: " + newValue);
// 	console.log("challonge newValue.length: " + newValue.length);
// 	console.log("challonge tournament names:");
// 	for(var i=0; i<newValue.length; i++) {
// 		console.log(newValue[i].tournament.name);
// 	}
// });

// We like to target our buttons and inputs with `ctrl-` class names. However, you can use whatever you want!
var updateMatchName = document.getElementById('ctrl-matchname');
var updateCasterNames = document.getElementById('ctrl-casterNames');
var updateTimer = document.getElementById('ctrl-startTimer');
var refreshImages = document.getElementById('ctrl-getOverlayImages');
var matchSelect = document.getElementById('ctrl-matchSelect');

var selectLogoImage = document.getElementById('ctrl-selectLogoImage');
var selectBgImage = document.getElementById('ctrl-selectBgImage');

var repMatchName = nodecg.Replicant('matchName');
var repTimerEnd = nodecg.Replicant('timerEnd');
var repCasterNames = nodecg.Replicant('casterNames');
const repOverlayImages = nodecg.Replicant('assets:overlay-images');
var repLogoImageAsset = nodecg.Replicant('logoImageAsset');
var repBgImageAsset = nodecg.Replicant('bgImageAsset');
var repCurrTournMatches = nodecg.Replicant('currTournMatches');
var repCurrTournParticipants = nodecg.Replicant('currTournParticipants');


updateMatchName.addEventListener('click', function () {
	repMatchName.value = document.getElementById('matchName').value;
});
updateCasterNames.addEventListener('click', function () {
	repCasterNames.value = document.getElementById('casterNames').value;
});

matchSelect.addEventListener('change', function(value) {
	console.log("Match selected: " + matchSelect.value);
	var matchName = decodeURIComponent(matchSelect.value.split(";")[0]);
	document.getElementById('matchInfo-name').innerHTML = matchName;
	repMatchName.value = matchName;
});

updateTimer.addEventListener('click', function () {
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

/**
refreshImages.addEventListener('click', function() {
	console.log("Overlay image dump: " + repOverlayImages.value);
	console.log("Overlay image length: " + repOverlayImages.length);
	console.log("Overlay image name: " + repOverlayImages.name);
	console.log("repOverlayImages properties::");
	for (var propName in repOverlayImages) {
		var propValue = repOverlayImages[propName];
		console.log(propName, propValue);
	}
	for (var i = 0; i < repOverlayImages.value.length; i++) {
		console.log(repOverlayImages.value[i].base);
		var propertyObj = repOverlayImages.value[i];
		console.log("propertyObj: " + propertyObj);
		for (var prop in repOverlayImages.value[i]) {
			console.log("VALUE: " + prop + "; " + repOverlayImages.value[i][prop]);
		}
		//console.log(repOverlayImages[flat-nexus][url]);
	}
});
**/

selectLogoImage.addEventListener('change', function () {
	var tmpFindAssetByURL = repOverlayImages.value.find(function (element) {
		return element["url"] == selectLogoImage.value;
	});
	repLogoImageAsset.value = tmpFindAssetByURL;
});

selectBgImage.addEventListener('change', function () {
	var tmpFindAssetByURL = repOverlayImages.value.find(function (element) {
		return element["url"] == selectBgImage.value;
	});
	repBgImageAsset.value = tmpFindAssetByURL;
});

repMatchName.on('change', function (newValue, oldValue) {
	console.log("matchName changed from " + oldValue + " to " + newValue);
	document.getElementById("matchName").value = newValue;
});
repCasterNames.on('change', function (newValue, oldValue) {
	console.log("CasterNames changed from " + oldValue + " to " + newValue);
	document.getElementById("casterNames").value = newValue;
});
repCurrTournMatches.on('change', function (newValue, oldValue) {
	//get the active matches
	NodeCG.waitForReplicants(repCurrTournParticipants).then(() => {
		var selectHTML = "";

		for (var i = 0; i < newValue.length; i++) {
			var match = newValue[i].match;
			if (match.state === "open") {
				var roundType = "Winners";
				if (match.round < 0) {
					roundType = "Losers";
				}
				var team1Name = getTeamNameByID(match.player1_id, repCurrTournParticipants.value);
				var team2Name = getTeamNameByID(match.player2_id, repCurrTournParticipants.value);
				var matchName = `${roundType} Round ${Math.abs(match.round)}`;
				// selectHTML = selectHTML.concat("<option>" + roundType + " Round " + Math.abs(match.round) + " | " + team1Name + " vs " + team2Name + "</option>");
				var optValue = `${encodeURIComponent(matchName)};${encodeURIComponent(team1Name)};${encodeURIComponent(team2Name)}`;
				selectHTML = selectHTML.concat(`<option value=\"${optValue}\">${matchName} | ${team1Name} vs ${team2Name}</option>`);
			} else {
				//do nothing, this is a closed match
			}
		}
		matchSelect.innerHTML = selectHTML;
	});
});
repOverlayImages.on('change', function (newValue, oldValue) {
	console.log("OverlayImages changed from " + oldValue + " to " + newValue);
	var assetSelectorContent = "<option value=\"none\">------</option>";
	var assetImgList = document.getElementsByClassName('asset-img-selector');
	for (var i = 0; i < newValue.length; i++) {
		assetSelectorContent = assetSelectorContent.concat("<option value=\"" + newValue[i]["url"] + "\">" + newValue[i]["name"] + "</option>");
	}
	for (var j = 0; j < assetImgList.length; j++) {
		assetImgList[j].innerHTML = assetSelectorContent;
	}
});
repLogoImageAsset.on('change', function (newValue, oldValue) {
	console.log("repLogoImageAsset change from " + oldValue + " to " + newValue);
	document.getElementById('ctrl-selectLogoImage').value = newValue["url"];
});
repBgImageAsset.on('change', function (newValue, oldValue) {
	console.log("repBgImageAsset change from " + oldValue + " to " + newValue);
	document.getElementById('ctrl-selectBgImage').value = newValue["url"];
});

function getTeamNameByID(teamID, participantArray) {
	console.log(participantArray);
	for (let team of participantArray) {
		if (team.participant["id"] == teamID) {
			return team.participant["name"];
		}
	}
	return "TBD";
}
