var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors')
const session = require('express-session');
const passport = require('passport');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const randomString = require('randomstring');

var app = express();

;

app.use(cors({ origin: ["http://localhost:4000" , "http://localhost/api"] , credentials: true }));

//database
var mongoose = require('mongoose');
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/connect_mongodb_session',
  collection: 'mySessions'
});

mongoose.connect('mongodb://localhost:27017/commenthub', { useNewUrlParser: true });

//mongoose.connect('mongodb://bellafkb:pool2comment@ds157256.mlab.com:57256/commenthub' ,  { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log("Db Connection Successful!");
});

store.on('error', function (error) {
  console.log(error);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'password',
    resave: false,
    saveUninitialized: false,
    store: store
  }));

app.use(passport.initialize());
app.use(passport.session());

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// view engine setup

//Access-Control-Allow-Origin
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;