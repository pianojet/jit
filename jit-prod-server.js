// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 80;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var configDB = require('./config/database.js');



// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

    app.use('/views', express.static('views'));

    // set up our express application
    app.use(express.logger('prod')); // log every request to the console
    app.use(express.cookieParser()); // read cookies (needed for auth)
    app.use(express.bodyParser()); // get information from html forms

    app.set('view engine', 'ejs'); // set up ejs for templating

    // required for passport
    app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

});

// app.use(express.static(__dirname+'/views/templates'));
// app.use(express.static(__dirname+'/views/styles'));
// app.use(express.static(__dirname+'/views/services'));
// app.use(express.static(__dirname+'/views/directives'));
// app.use(express.static(__dirname+'/views/filters'));
//app.use(express.static(__dirname+'/views/controllers/core.js'));
//app.use("/views/controllers", express.static(__dirname + '/views/controllers/core.js'));



// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(80, 'solicon.me');
console.log('PROD environment live');
