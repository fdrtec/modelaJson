var RemodelJSonService = function() {

    var self = this;
    self.remodelJson = remodelJson;

    function printer(finalJson, dest) {
        var jsonfile = require('jsonfile');
        jsonfile.writeFileSync(dest, finalJson);
    }

    function remodelJson(src, dest) {
        var originListParticipants = require('./' + src);
        // const bfj = require('bfj');
        // bfj.read('originListParticipants');
        // console.log(bfj);


        var finalJson = {};

        originListParticipants.forEach(function(participantData) {
            var remodelContentList = {};
            var keyList = Object.keys(participantData);

            keyList.shift();
            var participantValue = participantData.IDELSA;

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
