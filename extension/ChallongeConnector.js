const request = require('request');
const nodecg = require('./util/nodecg-api-context.js').get();

var repTournamentList = nodecg.Replicant('tournamentList');
var repCurrTournParticipants = nodecg.Replicant('currTournParticipants');
var repCurrTournMatches = nodecg.Replicant('currTournMatches');

nodecg.listenFor('getTournaments', data => {
  // console.log(data);
  var url = `https://${data.id}:${data.key}@api.challonge.com/v1/`;
  request.get(url + 'tournaments', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    // console.log(res);
    // console.log(body);
    repTournamentList.value = body;
  });
});

nodecg.listenFor('getParticipantsByTournamentId', (data, ack) => {
  // console.log("getParticipantsByTournamentId: " + data);
  var url = `https://${data.id}:${data.key}@api.challonge.com/v1/`;
  request.get(url + "tournaments/" + data.tournament + "/participants",
    { json: true },
    (err, res, body) => {
      if (err) {
        ack(err);
        return console.log(err);
      }
      // console.log(body);
      // console.log(res);
      repCurrTournParticipants.value = body;
      if (ack && !ack.handled) {
        ack(null);
      }
    });
});

nodecg.listenFor('getMatchesByTournamentId', data => {
  // console.log("getMatchesByTournamentId: " + data);
  var url = `https://${data.id}:${data.key}@api.challonge.com/v1/`;
  request.get(url + "tournaments/" + data.tournament + "/matches",
    { json: true },
    (err, res, body) => {
      if (err) { return console.log(err); }
      // console.log(body);
      repCurrTournMatches.value = body;
    });
});