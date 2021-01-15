var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

var session = require('express-session');


//MongoDB connection strings
mongoose.connect(
  process.env.MONGO__ACCESS, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Database is  Connected"));





var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cookingRouter = require('./routes/cooking');
var gardeningRouter = require('./routes/gardening');
var contactRouter = require('./routes/contact');





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'perilous journey' }));


// in production never have this set up for cors
app.use(cors());
app.use(bodyParser.json());

/* const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port ${PORT}`)); */




app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gardening', gardeningRouter);
app.use('/cooking', cookingRouter);
app.use('/contact', contactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are in!')
  // we're connected!
});


module.exports = app;
