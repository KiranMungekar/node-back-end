
require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser= require('body-parser');
var mongoose= require('mongoose');
const db = mongoose.connection;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter= require('./routes/movies');


var app = express();

//DataBase setup;
const dbUri='mongodb://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME;
console.log(dbUri);
mongoose.connect(dbUri,{useNewUrlParser: true,useUnifiedTopology: true});

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open',  ()=> { 
  console.log('Database connected');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/movies',moviesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

