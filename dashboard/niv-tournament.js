'use strict';


if (window.jQuery) {
	console.log("jQuery is loaded for niv-tournament.js");
}

// We like to target our buttons and inputs with `ctrl-` class names. However, you can use whatever you want!
var updateMatchName = document.getElementById('ctrl-matchname');
var updateCasterNames = document.getElementById('ctrl-casterNames');
var updateTimer = document.getElementById('ctrl-startTimer');
var refreshImages = document.getElementById('ctrl-getOverlayImages');

var selectLogoImage = document.getElementById('ctrl-selectLogoImage');
var selectBgImage = document.getElementById('ctrl-selectBgImage');

var repMatchName = nodecg.Replicant('matchName');
var repTimerEnd = nodecg.Replicant('timerEnd');
var repCasterNames = nodecg.Replicant('casterNames');
const repOverlayImages = nodecg.Replicant('assets:overlay-images');
var repLogoImageAsset = nodecg.Replicant('logoImageAsset');
var repBgImageAsset = nodecg.Replicant('bgImageAsset');


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

selectLogoImage.addEventListener('change', function() {
	var tmpFindAssetByURL = repOverlayImages.value.find(function(element) {
		return element["url"] == selectLogoImage.value;
	});
	repLogoImageAsset.value = tmpFindAssetByURL;
});

selectBgImage.addEventListener('change', function() {
	var tmpFindAssetByURL = repOverlayImages.value.find(function(element) {
		return element["url"] == selectBgImage.value;
	});
	repBgImageAsset.value = tmpFindAssetByURL;
});

repMatchName.on('change', function(newValue, oldValue) {
	console.log("matchName changed from " + oldValue + " to " + newValue);
	document.getElementById("matchName").value = newValue;
});
repCasterNames.on('change', function(newValue, oldValue) {
	console.log("CasterNames changed from " + oldValue + " to " + newValue);
	document.getElementById("casterNames").value = newValue;
});
repOverlayImages.on('change', function(newValue, oldValue) {
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
repLogoImageAsset.on('change', function(newValue, oldValue) {
	console.log("repLogoImageAsset change from " + oldValue + " to " + newValue);
	document.getElementById('ctrl-selectLogoImage').value = newValue["url"];
});
repBgImageAsset.on('change', function(newValue, oldValue) {
	console.log("repBgImageAsset change from " + oldValue + " to " + newValue);
	document.getElementById('ctrl-selectBgImage').value = newValue["url"];
});
