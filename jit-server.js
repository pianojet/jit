// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;


mongoose.connect('mongodb://localhost/SomeDb');     // connect to mongoDB database on modulus.io

// models ===================
var Todo = mongoose.model('Todo', {
    text : String
});



// configuration =================


app.use(express.static(__dirname + '/public'));         // set the static files location /public/img will be /img for users
app.use(express.logger('dev'));                         // log every request to the console
app.use(express.bodyParser());                          // pull information from html in POST
app.use(express.methodOverride());                      // simulate DELETE and PUT
app.use(express.cookieParser());
app.use(express.session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

// routes ======================================================================


// api ---------------------------------------------------------------------
// get all todos
app.get('/api/todos', function(req, res) {

    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(todos); // return all todos in JSON format
    });
});

// create todo and send back all todos after creation
app.post('/api/todos', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text : req.body.text,
        done : false
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

// application -------------------------------------------------------------

// login/session -----------------
app.get('/login', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('./public/login.ejs'); 
});

app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('./public/signup.ejs');
});

app.get('/profile', isLoggedIn, function(req, res) {
    res.render('./public/profile.ejs', {
        user : req.user // get the user out of session and pass to template
    });
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


app.get('/', function(req, res) {
    res.render('./public/index.ejs'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(3000, 'solicon.me');
console.log("App listening on port 3000");



