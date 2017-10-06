var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan'); //日志输出
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var index = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods');


var app = express();

// view engine setup  视图引擎

app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express)    //使用前需先通过cnpm i ejs --save安装ejs，通过ejs设置模板引擎
app.set('view engine', 'html');    //然后再把视图引擎设置为html或者jade

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//拦截用户有没有登录，方便进行登录后的其他操作
app.use(function(req,res,next){
  if(req.cookies.userId){    //如果cookies里有用户Id，说明已经登陆，可进行其他的操作
  	 next();
  }else{     //未登陆时需要进行的判断
  	 if(req.originalUrl=='/users/login' || req.originalUrl=='/users/logout' || req.originalUrl.indexOf('/goods/list')>-1){    //这是未登陆时可进行的操作白名单
  	     next();
  	 }else{    //若是未登录就去执行其他操作，就会发出提示，当前未登录
  	 	res.json({
  	 		status:'10001',
  	 		msg:'当前未登录',
  	 		result:''
  	 	});
  	 }

  }

});

app.use('/', index);
app.use('/users', users);
app.use('/goods',goods);



// catch 404 and forward to error handler，捕获404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
