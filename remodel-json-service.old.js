var bfj = require('bfj');
var fs = require('fs');



var RemodelJSonService = function() {
    var self = this;
    var _emitter = null;

    self.remodelJson = remodelJson;

    function remodelJson(src, dest) {
      _addEventListeners(src);

      bfj.read(src)
        .then(function(data) {
          console.log('aqui');
          var parsedData = _parse2(data);
          _printer(parsedData, dest);
        })
        .catch(function(error) {
          console.log(error);
        });
    }




    function _addEventListeners(src) {
      var stream = fs.createReadStream(src);
      var counter = 0;

      _emitter = bfj.walk(stream);

      _emitter.on(bfj.events.object, function() {
        console.log('Participante %d lido.', ++counter);
        // if (counter % 100 === 0) {
        //   console.log(new Date(Date.now()).toLocaleTimeString());
        // }
      });
    }

    function _createListenerOption() {
      var options = {};

      options.reviver = function(key, value) {
        console.log('pew');
        console.log(key);
        console.log(value);
        return value;
      };

      return options;
    }

    function _printer(finalJson, dest) {
      var jsonfile = require('jsonfile');
      jsonfile.writeFile(dest, finalJson);
    }

    function _parse(data) {
      var finalJson = {};

      data.forEach(function(participantData) {
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

      return finalJson;
    }

    function _parse2(data) {
      var finalJson = {};
      var dataLength = data.length;
      var current = 0;
      var participantData = {};

      for (; current < dataLength; ++current) {
        participantData = data[current];
        var remodelContentList = {};
        var participantValue = participantData.IDELSA;
        delete participantData.IDELSA;
        var keyList = Object.keys(participantData);

        for (var keyParticipant in keyList) {
          remodelContentList[keyParticipant] = {
            valor: participantData[keyParticipant],
            label: null
          };
        }

        finalJson[participantValue] = remodelContentList;
        remodelContentList = null;
      }

      return finalJson;
    }
};

module.exports = new RemodelJSonService();
