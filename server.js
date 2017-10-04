var express = require('express'),
  stylus = require('stylus'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

//stylus - compile function
function compile(str, path) {
  return stylus(str).set('filename', path)
}

app.use(stylus.middleware(
  {
    src: __dirname + '/public',
    compile: compile
  }
));

//static route to /public
app.use(express.static(__dirname + '/public'));

//mongodb setup
if (env==='development'){
  mongoose.connect('mongodb://localhost/multivision');
}else{
  mongoose.connect('mongodb://admin:admin@ds161164.mlab.com:61164/multivision');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb : connection error...'));
db.on('open', function () {
  console.log('mongodb : database connected');
});

//angular partials setup
app.get('/partials/:partialPath', function (req, res) {
  console.log('partials/' + req.params.partialPath);
  res.render('partials/' + req.params.partialPath)
});


app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');


app.get('*', function (req, res) {
  console.log('render index');
  res.render('index');
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('listening on port ' + port);