var jsonfile = require('jsonfile');
var file = "Original2Linhas.json";

jsonfile.readFile(file, function(err, obj) {
    remodelJson(obj);
});

var finalJson = {};

function remodelJson(originListParticipants) {

    originListParticipants.forEach(function(participantData) {
        var remodelContentList = {};
        var keyList = Object.keys(participantData); //separa as chaves

        keyList.shift(); // exclui o primeiro elemento

        var participantValue = participantData.IDELSA; //separa o valor do participante

        delete participantData.IDELSA;

        for (var keyParticipant in keyList) {
            remodelContentList[keyList[keyParticipant]] = {
                valor: participantData[keyList[keyParticipant]],
                label: null
            };
        }
        finalJson[participantValue] = remodelContentList;
    });
    console.log(finalJson);
}
