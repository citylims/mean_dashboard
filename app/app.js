// dependencies
var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    hash = require('bcrypt-nodejs'),
    path = require('path'),
    passport = require('passport'),
    localStrategy = require('passport-local' ).Strategy;
    morgan = require('morgan')
    favicon = require('serve-favicon');

//instances
mongoose.connect('mongodb://localhost/passport_local');

var User = require('./models/user.js');
var app = express();
var routes = require('./routes/api.js');

var auth = function(req, res, next){
  res.send(req.isAuthenticated() ? req.user : '0');
};

// middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(favicon('./public/assets/favicon.ico'));

// passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
//angular app
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
//api calls
app.use('/user/', routes);
//helpers
app.get('/loggedin', function(req, res) {
  auth(req, res)
});

//error handlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

//app
module.exports = app;
