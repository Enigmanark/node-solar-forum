// /routes/route_index.js

var Board = require('../app/models/Board.js');

module.exports = function(config, app) {
    //===============================================
    //===========Home================================
    //===============================================
    app.get('/', function(req, res) {
        Board.find( {}, function(err, boards) {
            //Sort boards based on order of creation via their storted orderIndex var
            boards.sort(function(a, b) {
                return parseInt(a.orderIndex) - parseInt(b.orderIndex);
            })
            res.render('index.ejs', {
                title : config.title,
                loggedIn : req.isAuthenticated(),
                user : req.user,
                boards: boards
            });
        })
    });
}