var mongoose = require('mongoose'),
  crypto = require('crypto');


module.exports = function (config) {

//mongodb setup
  mongoose.connect(config.dbURI, {useMongoClient: true});
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'mongodb : connection error...'));
  db.on('open', function () {
    console.log('mongodb : database connected ' + config.dbURI);
  });

  var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    salt: String,
    hashed_pwd: String
  });

  userSchema.methods = {
    authenticate: function (passwordToMatch) {
      return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
  }

  var User = mongoose.model('User', userSchema);
  User.find({}).exec(function (err, collection) {
      if (collection.length == 0) {
        var salt, hash;
        salt = createSalt();
        console.log("SALT " + salt);
        hash = hashPwd(salt, "jonasta")
        console.log("HASH" + hash);
        User.create({firstName: "Jonasta", lastName: "Santos", userName: "jonasta", salt: salt, hashed_pwd: hash});
        salt = createSalt();
        hash = hashPwd(salt, "Natalia")
        User.create({firstName: "Natalia", lastName: "Brito", userName: "Natalia", salt: salt, hashed_pwd: hash});
        salt = createSalt();
        hash = hashPwd(salt, "Julia")
        User.create({firstName: "Julia", lastName: "Silva", userName: "Julia", salt: salt, hashed_pwd: hash});
      }
    }
  );

  function createSalt() {
    return crypto.randomBytes(128).toString('base64');
  }

  function hashPwd(salt, pwd) {
    // var hmac = crypto.createHmac('sha1', salt);
    // hmac.setEncoding('hex');
    // hmac.write(pwd);
    // hmac.end();
    // return hmac.read;

    const hash = crypto.createHmac('sha256', pwd)
      .update(salt)
      .digest('hex');
    console.log(hash);
    return hash;

  }
}

