/**
 * Module dependencies.
 */
var express = require('express');
//var multer = require('multer');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');
var formidable = require('formidable');
var fs = require('fs-extra');
var qt = require('quickthumb');
var hash = require('./pass').hash;

var index = require('./routes/index');
var bucket = require('./routes/bucket');
var friend = require('./routes/friend');
//var map = require('./routes/map');
var adventure = require('./routes/adventure');
//var share = require('./routes/share');
var login = require('./routes/login');
var start_adventure = require('./routes/start_adventure');

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
mongoose.connect("mongodb://localhost/myapp");
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    salt: String,
    hash: String
});

var User = mongoose.model('users', UserSchema);

app.use(express.cookieParser('Authentication Tutorial '));
    app.use(express.session());


// Add routes here
app.get('/', index.view);
app.get('/bucket', bucket.view);
app.get('/buckets', bucket.addToBucket);

app.get('/friend', friend.view);
//app.get('/map', map.view);
app.get('/adventure', adventure.view);
//app.get('/share', share.view);
app.get('/login', login.view);
app.get('/createlogin', createlogin.view);
app.get('/start_adventure', start_adventure.view);
//app.get('/add', add.addAdventure);

app.use(qt.static(__dirname + '/'));
app.post('/upload', add.upload);
app.get('/upload', friend.view);

///////////////////////
app.use(function (req, res, next) {
    var err = req.session.error,
        msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});

app.post("/createlogin", userExist, function (req, res) {
    var password = req.body.password;
    var username = req.body.username;

    hash(password, function (err, salt, hash) {
        if (err) throw err;
        var user = new User({
            username: username,
            salt: salt,
            hash: hash,
        }).save(function (err, newUser) {
            if (err) throw err;
            authenticate(newUser.username, password, function(err, user){
                if(user){
                    req.session.regenerate(function(){
                        req.session.user = user;
                        req.session.success = 'Authenticated as ' + user.username + ' click to <a href="/logout">logout</a>. ' + ' You may now access <a href="/restricted">/restricted</a>.';
                        res.redirect('/');
                    });
                }
            });
        });
    });
});

app.post("/login", function (req, res) {
    authenticate(req.body.username, req.body.password, function (err, user) {
       
        if (user) {

            req.session.regenerate(function () {
                //  console.log(user);
                req.session.user = user;
                req.session.success = 'Authenticated as ' + user.username + ' click to <a href="/logout">logout</a>. ' + ' You may now access <a href="/restricted">/restricted</a>.';
                res.redirect('/');
            });
        } else {
            req.session.error = 'Authentication failed, please check your ' + ' username and password.';
            res.redirect('/login');
        }
    });
});

app.get('/logout', function (req, res) {
    req.session.destroy(function () { 
        res.redirect('/');
    });
});

app.get('/profile', requiredAuthentication, function (req, res) {
    res.send('Profile page of '+ req.session.user.username +'<br>'+' click to <a href="/logout">logout</a>');
});

/*
Helper Functions
*/
function authenticate(name, pass, fn) {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);

    User.findOne({
        username: name
    },

    function (err, user) {
        if (user) {
            if (err) return fn(new Error('cannot find user'));
            hash(pass, user.salt, function (err, hash) {
                if (err) return fn(err);
                if (hash == user.hash) return fn(null, user);
                fn(new Error('invalid password'));
            });
        } else {
            return fn(new Error('cannot find user'));
        }
    });
}

function requiredAuthentication(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}

function userExist(req, res, next) {
    User.count({
        username: req.body.username
    }, function (err, count) {
        if (count === 0) {
            next();
        } else {
            req.session.error = "User Exist"
            res.redirect("/createlogin");
        }
    });
}


///////////////////////

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
