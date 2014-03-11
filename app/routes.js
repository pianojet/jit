// app/routes.js
var util = require('util');
var user_model = require('./models/user.js');

module.exports = function(app, passport) {


    app.get('/api/users', isSuper, function(req, res){
        res.contentType('application/json');
        user_model.find(function(err, data){
            if (data != null) {
                res.send(JSON.stringify(data));    
            }
        });
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form

    app.get('/public', function(req, res) {

    });

    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile/:page(|calendar|week|day)', autoLogIn, function(req, res) {  
        res.render('profile.ejs', {
            page: req.params.page,
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/admin/users', isSuper, function(req, res) {

        // res.render('admin.ejs', {
        //     page: req.params.page,
        //     user: req.user // get the user out of session and pass to template
        // });
    });

    app.get('/admin', isSuper, function(req, res) {
        res.render('admin.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });    

    // app.get('/calendar', function(req, res) {
    //     res.render('calendar.ejs', {
    //         user : req.user // get the user out of session and pass to template
    //     });
    // });    

    // app.get('/calendar', isLoggedIn, function(req, res) {
    //     res.render('calendar.ejs', {
    //         user : req.user // get the user out of session and pass to template
    //     });
    // });    

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));    

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });



    app.get('/', function(req, res) {
        //res.redirect('/index.ejs');
        res.render('index.ejs'); // load the index.ejs file
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function autoLogIn(req, res, next) {
    user = user_model.find({'local.email': 'test'}, function(err, userdata){
        console.log("user:"+util.inspect(userdata));
        req.login(userdata[0], function(err) {
          if (err) { 
            console.log("err:"+err);
            return next(err); }
          return next();
        });    
    });
}

// route middleware to make sure a user is logged in
function isSuper(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated() && req.user.auth.super)
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
