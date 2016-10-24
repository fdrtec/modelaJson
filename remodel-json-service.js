var fs = require('fs');
var jsonfile = require('jsonfile');

var RemodelJSonService = function() {
  var self = this;
  var _emitter = null;
  var _beginObjectPosition = 0;
  var _endObjectPosition = false;
  var _data = '';
  var _json = {};
  var _dest = {};

  self.remodelJson = remodelJson;

  function remodelJson(src, dest) {
    _dest = dest;
    var readStream = fs.createReadStream(src);
    readStream.setEncoding('utf8');
    readStream.on('data', _readData);
  }

  function _readData(chunk) {
    _data += chunk.replace(/(\s|\r|\n|\t|\[|\])+/g, '');
    _data += _data.replace(/(\},)+/g, '}');

    _endObjectPosition = (_beginObjectPosition && _data.search(/}/) > -1) ? _data.search(/}/) : false;

    if (_endObjectPosition) {
      _parseData();
    }
  }

  function _parseData() {
    var nextParticipantData = _data.substring(_beginObjectPosition, _endObjectPosition);
    _parseParticipantData(JSON.parse(nextParticipantData));
    _data = _data.substring(_endObjectPosition + 1);
  }

  function _parseParticipantData(participantData) {
    var currentParticipant = participantData.IDELSA;
    _json[currentParticipant] = _applyNewModel(participantData);
    jsonfile.writeFile(_dest, _json);
    // console.log('Participante %s processado.', currentParticipant);
  }

  function _applyNewModel(participantData) {
    var participantValue = participantData.IDELSA;
    delete participantData.IDELSA;

    var newModel = {};
    var variables = Object.keys(participantData);

    variables.map(function(variable) {
      newModel[variable] = {
        valor: participantData[variable],
        label: null
      };
    });

    return newModel;
  }
};

module.exports = new RemodelJSonService();
