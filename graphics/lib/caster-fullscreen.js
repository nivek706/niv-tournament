var repCasterNames = nodecg.Replicant('casterNames');

repCasterNames.on('change', function(oldValue, newValue){
	console.log("casterNames changed from " + oldValue + " to " + newValue);
	$('#casterNames').html(repCasterNames.value);
});
