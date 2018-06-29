var repCasterNames = nodecg.Replicant('casterNames');
var repLogoImageAsset = nodecg.Replicant('logoImageAsset');
var repBgImageAsset = nodecg.Replicant('bgImageAsset');

repLogoImageAsset.on('change', function(newValue, oldValue){
	document.getElementById('logo').src = newValue['url'];
});

repBgImageAsset.on('change', function(newValue, oldValue){
	document.getElementById('content').style.backgroundImage = 'url('+newValue['url']+')';
});
