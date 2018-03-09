var repMatchName = nodecg.Replicant('matchName');
var repLogoImageAsset = nodecg.Replicant('logoImageAsset');

repMatchName.on('change', function(oldValue, newValue){
	console.log("matchName changed from " + oldValue + " to " + newValue);
	$('#match-name').html(repMatchName.value);
});

repLogoImageAsset.on('change', function(newValue, oldValue){
	document.getElementById('logo').src = newValue["url"];
});
