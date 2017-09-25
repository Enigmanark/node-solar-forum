// /server.js

var config = require('./config/config.js');
var path = require('path');
var express = require('express');
var port = process.env.PORT || 8080;

var app = express();

var mongoose = require('mongoose');
var passport = require('passport');

var cookieparser = require('cookie-parser');
var bodyparser = require('body-parser');
var session = require('express-session');

//configuration
var configDB = require('./config/database.js');
mongoose.connection.openUri(configDB.uri); //Connect to the database

//setup express
app.use(cookieparser());
app.use(bodyparser());
app.use(express.static("./public"));
app.set('view engine', 'ejs');

//setup passport
require("./config/passport")(passport); //pass passport to the configuration

//setup routes
require('./routes/route_index.js')(config, app);
require('./routes/route_account')(config, app, passport);

app.listen(port);
console.log("[Server] Server listening on port " + port);