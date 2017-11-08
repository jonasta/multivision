var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

var config = require("./server/config/config.js")[ env ];
require("./server/config/express.js")(app, config);
require("./server/config/mongo.js")(config);
require("./server/config/passport.js")();r


require("./server/config/routes.js")(app);
app.listen(config.port);
console.log('listening on port ' + config.port);