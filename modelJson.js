//var config =require('./Original2Linhas.json');
var remodelJsonService = require('./remodel-json-service.js');

// process.argv.forEach(function(val, index, array) {
//  console.log(index + ' : ' + val);
// });

var src = process.argv[2];
var dest = process.argv[3];

remodelJsonService.remodelJson(src, dest);

// var jsonfile = require('jsonfile');
// var file = "Original2Linhas.json";
//
// jsonfile.readFile(file, function(err, obj) {
//     remodelJson(obj);
//
// });
