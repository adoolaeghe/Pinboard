var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pinboard');
var db = mongoose.connection;

var routes = require('./routes/index');
var Users = require('./routes/users');
var Pinboards = require('./routes/pinboards');

//init APP

var app = express();

// View Engine
app.set('views', path.join(__dirname,'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
    root = namespace.shift(),
    formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));

// sessions
app.use(passport.initialize());
app.use(passport.session());

// flash messages for authentication errors
app.use(flash());
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('erros_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


//routes

app.use('/', routes);
app.use('/users', Users);
app.use('/pinboards', Pinboards);


module.exports = app.listen(3000);
