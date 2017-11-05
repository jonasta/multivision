var mongoose = require('mongoose');


module.exports = function (config) {

//mongodb setup
  mongoose.connect(config.dbURI, { useMongoClient: true });
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'mongodb : connection error...'));
  db.on('open', function () {
    console.log('mongodb : database connected ' + config.dbURI);
  });

  var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String
  });

  var User = mongoose.model('User', userSchema);
  User.find({}).exec(function (err, collection) {
      if (collection.length == 0) {
        User.create({firstName: "Jonasta", lastName: "Santos", userName: "Jonasta"});
        User.create({firstName: "Natalia", lastName: "Brito", userName: "Natalia"});
        User.create({firstName: "Julia", lastName: "Silva", userName: "Julia"});
      }
    }
  );

}

