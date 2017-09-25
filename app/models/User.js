// /app/models/User.js

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    userName : String,
    password : String,
    admin : Boolean,
    moderator : Boolean,
    banned : Boolean
});

//Methods

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User", userSchema);