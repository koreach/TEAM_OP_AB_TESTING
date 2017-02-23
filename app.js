/**
 * Module dependencies.
 */
var express = require('express');
//var multer = require('multer');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var formidable = require('formidable');
var fs = require('fs-extra');
var qt = require('quickthumb');

var index = require('./routes/index');
var bucket = require('./routes/bucket');
var friend = require('./routes/friend');
var map = require('./routes/map');
var adventure = require('./routes/adventure');
var share = require('./routes/share');
var login = require('./routes/login');

var createlogin = require('./routes/createlogin');
var add = require('./routes/add');
var util = require('util');
var app = express();
var bodyParser = require('body-parser');


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


// Add routes here
app.get('/', index.view);
app.get('/bucket', bucket.view);

app.get('/friend', friend.view);
app.get('/map', map.view);
app.get('/adventure', adventure.view);
app.get('/share', share.view);
app.get('/login', login.view);
app.get('/createlogin', createlogin.view);
//app.get('/add', add.addAdventure);

app.use(qt.static(__dirname + '/'));
app.post('/upload', add.upload);
app.get('/upload', friend.view);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});