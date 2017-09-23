// /server.js

var path = require('path');
var express = require('express');
var port = process.env.PORT || 8080;

var app = express();

var mongoose = require('mongoose');
var passport = require('passport');

var morgan = require('morgan');
var cookieparser = require('cookie-parser');
var bodyparser = require('body-parser');
var session = require('express-session');

//configuration
var configDB = require('./config/database.js');
mongoose.connection.openUri(configDB.uri);

//setup express
app.use(morgan('dev'));
app.use(cookieparser());
app.use(bodyparser());
app.use(express.static("./public"));
app.set('view engine', 'ejs');

//setup passport
//require("./config/passport")(passport); //pass passport to the configuration

//setup routes
require('./app/routes.js')(app, passport);


app.listen(port);
console.log("[Server] Server listening on port " + port);