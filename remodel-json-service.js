var RemodelJSonService = function() {

    var self = this;
    self.remodelJson = remodelJson;

    function printer(finalJson, dest) {
        var jsonfile = require('jsonfile');
        jsonfile.writeFileSync(dest, finalJson);
    }

    function remodelJson(src, dest) {
        var originListParticipants = require('./' + src);

        var finalJson = {};

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
        printer(finalJson, dest);
    }
};

module.exports = new RemodelJSonService();
