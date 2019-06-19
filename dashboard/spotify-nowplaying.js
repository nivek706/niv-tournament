'use strict';
console.log("Loading nivt-challonge.js");
var file = "[nivt-challonge]:";

var spotifyKey = document.getElementById('spotifyKey');
var submitSpotify = document.getElementById('ctrl-submitSpotify');
var stopSpotify = document.getElementById('ctrl-stopSpotify');

submitSpotify.addEventListener('click', function() {
    console.log("starting spotify")
    var data = {};
    data.apiKey = spotifyKey.value;
    // console.log(`id: ${data.id} | key: ${data.key}`);
    nodecg.sendMessage('startSpotifyNowPlaying', data);
});

stopSpotify.addEventListener('click', function() {
    console.log("stopping spotify")
    nodecg.sendMessage('stopSpotifyNowPlaying');
});