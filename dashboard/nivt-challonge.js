'use strict';
console.log("Loading nivt-challonge.js");
var file = "[nivt-challonge]:";

var challongeID = document.getElementById('challongeID');
var challongeKey = document.getElementById('challongeKey');
var submitChallonge = document.getElementById('ctrl-submitChallonge');
var refreshMatches = document.getElementById('ctrl-refreshMatches');
var selectTournament = document.getElementById('ctrl-selectTournament');

var repTournamentList = nodecg.Replicant('tournamentList');
var repCurrTournMatches = nodecg.Replicant('currTournMatches');
var repCurrTournParticipants = nodecg.Replicant('currTournParticipants');

submitChallonge.addEventListener('click', function () {
    var data = {};
    data.id = challongeID.value;
    data.key = challongeKey.value;
    // console.log(`id: ${data.id} | key: ${data.key}`);
    nodecg.sendMessage('getTournaments', data);

});

refreshMatches.addEventListener('click', function () {
    var data = {};
    data.id = challongeID.value;
    data.key = challongeKey.value;
    data.tournament = selectTournament.value;
    // console.log(`id: ${data.id} | key: ${data.key}`);
    nodecg.sendMessage('getParticipantsByTournamentId', data).then((value) => {
        console.log("repCurrTournParticipants really ready");
        nodecg.sendMessage('getMatchesByTournamentId', data);
    });
});

// selectTournament.addEventListener('change', function () {
//     var data = {};
//     data.id = challongeID.value;
//     data.key = challongeKey.value;
//     data.tournament = selectTournament.value;
//     console.log(`id: ${data.id} | key: ${data.key}`);
//     nodecg.sendMessage('getParticipantsByTournamentId', data).then((value) => {
//         console.log("repCurrTournParticipants really ready");
//         nodecg.sendMessage('getMatchesByTournamentId', data);
//     });
// });


// nodecg.sendMessage('getTournaments');
repTournamentList.on('change', function (newValue, oldValue) {
    // console.log(file + "challonge oldValue: " + oldValue);
    // console.log(file + "challonge newValue: " + newValue);
    // console.log(file + "typeof newValue: " + typeof (newValue));
    var tournSelectorContent = "<option value=\"none\">------</option>";
    var tournList = document.getElementById("ctrl-selectTournament");
    for (var i = 0; i < newValue.length; i++) {
        var tournament = newValue[i].tournament;
        // console.log("name: " + tournament.name + "| ID: " + tournament.id);
        tournSelectorContent = tournSelectorContent.concat("<option value=\"" + tournament.id + "\">" + tournament.name + "</option>")
    }
    tournList.innerHTML = tournSelectorContent;
});

repCurrTournParticipants.on('change', function (newValue, oldValue) {
    // console.log(file + "repCurrTournParticipants old: " + oldValue);
    // console.log(file + "repCurrTournParticipants new: " + newValue);
    var eleAllParticipants = document.getElementById("participants-all");
    // console.log(eleAllParticipants);
    var participantHTML = "";
    for (var i = 0; i < newValue.length; i++) {
        // console.log(newValue[i].participant);
        var participant = newValue[i].participant;
        if (participant.active) {
            participantHTML = participantHTML.concat("<div>" + participant.name + " | " + participant.id + "</div>");
        }
    }
    eleAllParticipants.innerHTML = participantHTML;
});

repCurrTournMatches.on('change', function (newValue, oldValue) {
    // console.log(file + "repCurrTournMatches changed: " + newValue);
    NodeCG.waitForReplicants(repCurrTournParticipants).then(() => {
        // console.log("repCurrTournParticipants ready to go");

        var eleAllMatches = document.getElementById("matches-all");
        var matchesHTML = "";

        for (var i = 0; i < newValue.length; i++) {
            // console.log(newValue[i].match);
            var match = newValue[i].match;
            var roundType = "Winners";
            if (match.round < 0) {
                roundType = "Losers";
            }
            // console.log("Checking participants for match: " + match.id);

            var team1Name = getTeamNameByID(match.player1_id, repCurrTournParticipants.value);
            var team2Name = getTeamNameByID(match.player2_id, repCurrTournParticipants.value);
            matchesHTML = matchesHTML.concat("<div>" + roundType + " Round " + Math.abs(match.round) + ", match " + match.identifier + " | " + team1Name + " vs " + team2Name + "</div>");
        }
        eleAllMatches.innerHTML = matchesHTML;
    });
});

function getTeamNameByID(teamID, participantArray) {
    // console.log("In getTeamNameByID");
    // console.log(participantArray);
    // console.log("Looking for teamID: " + teamID);
    // for (let key of participantArray) {
    //     console.log(key);
    //     for (let key2 of key) {
    //         console.log(key2);
    //     }
    // }
    // var retVal = participantArray.find(function(element) {
    //     return element.participant["id"] == teamID;
    // });

    for (let team of participantArray) {
        // console.log("checking team: " + team.participant["id"]);
        if (team.participant["id"] == teamID) {
            // console.log("success");
            return team.participant["name"];
        }
    }
    return "TBD";

}