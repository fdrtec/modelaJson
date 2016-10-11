var JsonTest = [
        {
            "IDELSA": "1000SP",
            "RCTB8": 1,
            "CENTROB": "RS",
            "RCPB1": "20:00",
            "HOCB75": "trabalho na biblioteca",
            "dataParticipantIFB10A": "Porto Alegre",
            "MEDB7_4": "ESPIRONOLACTONA",
            "RCPBDATAAPINI": " 12MAR14:07:25:00.000",
            "RCPBDATADIGINI": " 12MAR14:07:57:44.856"
        }, {
            "IDELSA": "1001SP",
            "RCTB8": 2,
            "CENTROB": "SP",
            "RCPB1": "20:00",
            "HOCB75": "atidataParticipantidades com professor quimico",
            "dataParticipantIFB10A": "três irmãos",
            "MEDB7_4": "ESPIRONOLACTONA",
            "RCPBDATAAPINI": " 12MAR14:07:25:00.000",
            "RCPBDATADIGINI": " 12MAR14:07:57:44.856"
        }
    ];

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
