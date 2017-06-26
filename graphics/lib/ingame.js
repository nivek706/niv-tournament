var repMatchName = nodecg.Replicant('matchName');

repMatchName.on('change', function(oldValue, newValue){
	console.log("matchName changed from " + oldValue + " to " + newValue);
	$('#match-name').html(repMatchName.value);
});

