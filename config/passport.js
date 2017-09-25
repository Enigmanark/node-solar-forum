// /config/passport.js

var localStrategy = require('passport-local').Strategy;

var User = require('../app/models/User.js');

module.exports = function(passport) {
    //=================================================
    //==========Passport Persistent Session Setup======
    //=================================================

    //serialize the user
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    //deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    
    //==================================================
    //==========Local login strategy====================
    //==================================================

    passport.use('local', new localStrategy({
        usernameField: 'userName',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, userName, password, done){ //callback from our form
        //See if can find the user in the database
        User.findOne( {"userName" : userName}, function(err, user){
            if(err) {
                return done(err);
            }
            //If we can't find the user
            if(!user) {
                done(null, false, req.flash("loginMessage", "User not found."));
            } 
            //We found the user, but the password is wrong
            if(!user.validPassword(password)) {
                done(null, false, req.flash("loginMessage", "Password is incorrect."));
            }
            //All is well, return the user
            return done(null, user);
        });
    }));
}