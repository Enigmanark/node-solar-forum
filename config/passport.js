// /config/passport.js

var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/User.js');

module.exports = function(passport) {
    //=================================================
    //==========Passport Persistent Session Setup======
    //=================================================

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    
    //==================================================
    //==========Local login strategy====================
    //==================================================

    passport.use('local', new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, userName, password, done) { // callback with email and password from our form
        
        // find a user whose email is the same as the forms email
        User.findOne({ 'userName' :  userName }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    }));
}