// /app/models/board.js

var mongoose = require('mongoose');

var boardSchema = new mongoose.Schema({
    topics : [],
    title : String
});

module.exports = new mongoose.model("Board", boardSchema);