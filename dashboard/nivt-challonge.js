'use strict';
console.log("Loading nivt-challonge.js");
var file = "[nivt-challonge]:";

var selectTournament = document.getElementById('ctrl-selectTournament');

var repTournamentList = nodecg.Replicant('tournamentList');
var repCurrTournMatches = nodecg.Replicant('currTournMatches');
var repCurrTournParticipants = nodecg.Replicant('currTournParticipants');

selectTournament.addEventListener('change', function () {
    nodecg.sendMessage('getParticipantsByTournamentId', selectTournament.value);
    nodecg.sendMessage('getMatchesByTournamentId', selectTournament.value);
});


nodecg.sendMessage('getTournaments');
repTournamentList.on('change', function (newValue, oldValue) {
    console.log(file + "challonge oldValue: " + oldValue);
    console.log(file + "challonge newValue: " + newValue);
    console.log(file + "typeof newValue: " + typeof (newValue));
    var tournSelectorContent = "<option value=\"none\">------</option>";
    var tournList = document.getElementById("ctrl-selectTournament");
    for (var i = 0; i < newValue.length; i++) {
        var tournament = newValue[i].tournament;
        console.log("name: " + tournament.name + "| ID: " + tournament.id);
        tournSelectorContent = tournSelectorContent.concat("<option value=\"" + tournament.id + "\">" + tournament.name + "</option>")
    }
    tournList.innerHTML = tournSelectorContent;
});

repCurrTournParticipants.on('change', function (newValue, oldValue) {
    console.log(file + "repCurrTournParticipants old: " + oldValue);
    console.log(file + "repCurrTournParticipants new: " + newValue);
    var eleAllParticipants = document.getElementById("participants-all");
    console.log(eleAllParticipants);
    var participantHTML = "";
    for (var i = 0; i < newValue.length; i++) {
        console.log(newValue[i].participant);
        var participant = newValue[i].participant;
        if (participant.active) {
            participantHTML = participantHTML.concat("<div>" + participant.name + "</div>");
        }
    }
    eleAllParticipants.innerHTML = participantHTML;
});

repCurrTournMatches.on('change', function (newValue, oldValue) {
    console.log(file + "repCurrTournMatches old: " + oldValue);
    console.log(file + "repCurrTournMatches new: " + newValue);
    var eleAllMatches = document.getElementById("matches-all");
    console.log(eleAllMatches);
    var matchesHTML = "";
    for (var i = 0; i < newValue.length; i++) {
        console.log(newValue[i].match);
        var match = newValue[i].match;
        var roundType = "Winners";
        if (match.round < 0) {
            roundType = "Losers";
        }
        matchesHTML = matchesHTML.concat("<div>" + roundType + " Round " + Math.abs(match.round) + ", match " + match.identifier + "</div>");
    }
    eleAllMatches.innerHTML = matchesHTML;
});