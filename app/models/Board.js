// /app/models/board.js

var mongoose = require('mongoose');

var boardSchema = new mongoose.Schema({
    topics : [],
    description: String,
    title : String,
    orderIndex : Number
});

module.exports = mongoose.model("Board", boardSchema);