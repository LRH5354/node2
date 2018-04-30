var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var busybody=require('connect-busboy')

//requre 请求相对路径
var index = require('./routes/index');
var users = require('./routes/users');
var saveresults=require('./routes/save/saveresults');
var poi=require('./POI/fsPOI');
var pagechange=require('./routes/nextpage')
var query=require('./routes/query');
var click=require('./routes/click-movie');
var recievefile=require('./routes/recievefile')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(busybody());

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(multipart());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/', index);
app.use('/users', users);
app.use('/more',pagechange);
app.use('/query',query);
app.use('/save',saveresults);
app.use('/poi',poi);
app.use('/click-m',click);
app.use('/uploadfile',recievefile)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  //set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
