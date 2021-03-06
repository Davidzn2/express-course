var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users/users');
var productsRouter = require('./routes/views/products')
var productsApiRouter = require('./routes/api/products.js')
var authApiRouter = require('./routes/api/auth.js')
var {
  logErrors,
  errorHandler,
  clientErrorHandler
} = require('./utils/middlewares/errorsHandlers')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/api/products', productsApiRouter)
app.use('/api/auth', authApiRouter);
app.get('/', function(req,res){
  res.redirect('/products')
})
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
// Handle errors
app.use(logErrors);
app.use(errorHandler);
app.use(clientErrorHandler);

const server = app.listen(8000, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
});
module.exports = app;
