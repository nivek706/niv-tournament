console.log("Hello World")
var api_key = "";
var url = 'https://nivek706:' + api_key + '@api.challonge.com/v1/';

const request = require('request');

const nodecg = require('./util/nodecg-api-context.js').get();

var repTournamentList = nodecg.Replicant('tournamentList');
var repCurrTournParticipants = nodecg.Replicant('currTournParticipants');
var repCurrTournMatches = nodecg.Replicant('currTournMatches');

nodecg.listenFor('getTournaments', data => {
  console.log(data);
  request.get(url + 'tournaments', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    // console.log(res);
    // console.log(body);
    repTournamentList.value = body;
  });
});

nodecg.listenFor('getParticipantsByTournamentId', data => {
  console.log("getParticipantsByTournamentId: " + data);
  request.get(url + "tournaments/" + data + "/participants", 
  {json: true}, 
  (err, res, body) => {
    if (err) { return console.log(err); }
    // console.log(body);
    // console.log(res);
    repCurrTournParticipants.value = body;
  });
});

nodecg.listenFor('getMatchesByTournamentId', data => {
  console.log("getMatchesByTournamentId: " + data);
  request.get(url + "tournaments/" + data + "/matches",
  {json: true},
  (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body);
    repCurrTournMatches.value = body;
  });
});
/*
const axios = require('axios');
let config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

axios.get(url, config)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });

/*
var request = new XMLHttpRequest();
request.open("GET", "https://nivek706:"+api_key+"@api.challonge.com/v1/tournaments");
request.onload = function() {
  var data = JSON.parse(this.response);
  console.log(data);
}
request.send();
*/
