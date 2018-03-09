var repCasterNames = nodecg.Replicant('casterNames');
var repLogoImageAsset = nodecg.Replicant('logoImageAsset');

repCasterNames.on('change', function(newValue, oldValue){
	console.log("casterNames changed from " + oldValue + " to " + newValue);
	$('#casterNames').html(repCasterNames.value);
});

repLogoImageAsset.on('change', function(newValue, oldValue){
	document.getElementById('logo').src = newValue["url"];
});
