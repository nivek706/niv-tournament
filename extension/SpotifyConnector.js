const request = require('request');
const nodecg = require('./util/nodecg-api-context.js').get();

var repSpotifyNowPlaying = nodecg.Replicant('spotifyNowPlaying');

var url = "https://api.spotify.com/v1/me/player/currently-playing";
var spotifyLoop;

nodecg.listenFor('startSpotifyNowPlaying', data => {
    spotifyLoop = setTimeout(function() {
        getSpotifyNowPlaying(data.apiKey)
    }, 5000);
});

nodecg.listenFor('stopSpotifyNowPlaying', () => {
    clearTimeout(spotifyLoop);
});

function getSpotifyNowPlaying(apiKey) {
    request.get(url, {
        json: true,
        'auth': {
            'bearer': apiKey
        }
    }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log("======SPOTIFY INFO=======");
        console.log(body);
        console.log("body.item.album");
        console.log(body.item.album);
        var spotifyInfo = {};
        spotifyInfo["songname"] = body.item.name;
        var artist = "";
        for (let value of body.item.album.artists) {
            console.log("value: " + value)
            if (artist == "") {
                artist = value.name;
            } else {
                artist = artist + ", " + value.name;
            }
        }
        spotifyInfo["artist"] = artist;
        // console.log("body.item.name");
        // console.log(body.item.name);
        // console.log("body.item.album.artists");
        // console.log(body.item.album.artists);
        console.log("spotifyInfo");
        console.log(spotifyInfo);
        spotifyLoop = setTimeout(function() {
            getSpotifyNowPlaying(apiKey)
        }, 5000);
    });
}

// setTimeout(getSpotifyNowPlaying, 5000);
// curl -X "GET" "https://api.spotify.com/v1/me/player/currently-playing" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQB7RQtNj37YcSqClBwPkR_9_v5caBwANIeoqIlehzmpr4lL6JoyIYRqqMxv3MrHDiP8SmvYOnWin_xLMGmaJidE6ZFHiTRuOae9cVH1ZlyrCI8Bbws5n3whTYwZQmShcuMvzPPICGsWBBwYQ7cy"