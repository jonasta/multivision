var mongoose = require('mongoose');

module.exports = function(config){

//mongodb setup
  mongoose.createConnection(config.dbURI);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'mongodb : connection error...'));
  db.on('open', function () {
    console.log('mongodb : database connected');
  });
}

