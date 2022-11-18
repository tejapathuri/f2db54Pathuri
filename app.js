var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy; 
 
require('dotenv').config(); 


//part 3 - point 9
var Dine = require("./models/Dining");


//part 3
require('dotenv').config();

const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});

//default connection

var db = mongoose.connection;

//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});


//part 3 - point 10
// We can seed the collection if needed on server start 
async function recreateDB(){ 
  // Delete everything 
  await Dine.deleteMany(); 
 
  let instance1 = new Dine({Dining_style:"Square",  Dining_type:'Medium', Dining_size:7}); 
  let instance2 = new Dine({Dining_style:"Oval",  Dining_type:'Extra large', Dining_size:25.4}); 
  let instance3 = new Dine({Dining_style:"Circle",  Dining_type:'Small', Dining_size:17.7});
  
  instance1.save( function(err,doc) { 
    if(err) return console.error(err); 
    console.log("First object saved") 
  }); 
  instance2.save( function(err,doc) { 
    if(err) return console.error(err); 
    console.log("Second object saved") 
  }); 
  instance3.save( function(err,doc) { 
    if(err) return console.error(err); 
    console.log("Third object saved") 
  }); 
} 
 
let reseed = true; 
if (reseed) { recreateDB();} 



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var DiningRouter = require('./routes/Dining');
var gridbuildRouter = require('./routes/gridbuild');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({ 
  secret: 'keyboard cat', 
  resave: false, 
  saveUninitialized: false 
})); 
app.use(passport.initialize()); 
app.use(passport.session()); 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Dining', DiningRouter);
app.use('/gridbuild', gridbuildRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);

// passport config 
// Use the existing connection 
// The Account model  
var Account =require('./models/account'); 
 
passport.use(new LocalStrategy(Account.authenticate())); 
passport.serializeUser(Account.serializeUser()); 
passport.deserializeUser(Account.deserializeUser()); 
 
 
 

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

passport.use(new LocalStrategy( 
  function(username, password, done) { 
    Account.findOne({ username: username }, function (err, user) { 
      if (err) { return done(err); } 
      if (!user) { 
        return done(null, false, { message: 'Incorrect username.' }); 
      } 
      if (!user.validPassword(password)) { 
        return done(null, false, { message: 'Incorrect password.' }); 
      } 
      return done(null, user); 
    }); 
  })); 

module.exports = app;

