var repCasterNames = nodecg.Replicant('casterNames');
var repLogoImageAsset = nodecg.Replicant('logoImageAsset');

repLogoImageAsset.on('change', function(newValue, oldValue){
	document.getElementById('logo').src = newValue["url"];
});
