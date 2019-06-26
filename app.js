var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors')
const session = require('express-session');
const passport = require('passport');
const hbs = require('express-handlebars');

var indexRouter = require('./routes/index');

var app = express();

app.engine('hbs', hbs({extname : 'hbs' , defaultLayout: 'layout' , layoutsDir : __dirname + '/views/layouts/'}));
app.set('views' , path.join(__dirname , 'views'))
app.set('view engine' ,'hbs')



app.use(cors({
  origin: ["http://localhost:4000",
    "http://localhost/api",
    'http://localhost:8080',
    'http://localhost:8081'],
  credentials: true
}));

//database
var mongoose = require('mongoose');
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
  uri: 'mongodb://172.2.200.8:27017/connect_mongodb_session',
  collection: 'mySessions'
});

mongoose.connect('mongodb://172.2.200.8:27017/commenthub', { useNewUrlParser: true });

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
    path: '/',
    domain: 'http://localhost:4000',
    secret: 'password',
    resave: false,
    saveUninitialized: false,
    store: store,
    maxAge: 24 * 60 * 60 * 1000
  }));

app.use(passport.initialize());
app.use(passport.session());

app.all('/backend/upsweep/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
//http://localhost/emotobackend/subpath
  req.url = req.url.replace(/^\/backend\/upsweep\//, '/');
  //http://localhost/emotobackend
  req.url = req.url.replace(/^\/emotobackend\/upsweep/, '/');
  next();
});

// view engine setup

//Access-Control-Allow-Origin
/*app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
});*/

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
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
