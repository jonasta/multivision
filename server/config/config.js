var path = require('path');
var rootPath  = path.normalize(__dirname + '/../../');

module.exports = {


  development: {
    rootPath : rootPath,
    port : process.env.port || 3030,
    dbURI : 'mongodb://localhost/multivision'
  },
  production: {
    rootPath : rootPath,
    port : process.env.port || 80,
    dbURI : 'mongodb://admin:admin@ds161164.mlab.com:61164/multivision'
  }
}