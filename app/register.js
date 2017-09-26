// /app/register.js

var User = require('../app/models/User.js');

module.exports = function(req, res, next) {
    var userName = req.body.userName;
    var password = req.body.password;
    var email = req.body.email;

    //See if the username already exists
    User.findOne({ "userName" : userName }, function(err, user) {
        if(user) { //If we found a user with that username, redirect with error
            res.redirect("/account/register?error=true");
        } else {
            var newUser = new User();
            newUser.userName = userName;
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.banned = false;
            newUser.admin = false;
            newUser.moderator = false;

            newUser.save(function(err) {
                return next();
            });
        }
    })
}