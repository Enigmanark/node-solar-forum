// /routes/route_board.js

var Board = require('../app/models/Board.js');

module.exports = function(config, app) {

    //Send form for creating new board
    app.get("/board/new", function(req, res) {
        if(req.query.success) {
            req.flash("newBoardMessage", "Your board was successfully created.");
        } else if(req.query.error) {
            req.flash("newBoardError", "There is a board with that name already.");
        }
        res.render("newBoard.ejs", {
            title : config.title,
            loggedIn : req.isAuthenticated(),
            user : req.user,
            message : req.flash("newBoardMessage"),
            errorMessage : req.flash("newBoardError")
        });
    });

    //Process form for new board
    app.post("/board/new", function(req, res) {
        var title = req.body.title;
        var desc = req.body.description;
        Board.findOne( { "title" : title }, function(err, board) {
            if(board) {
                res.redirect("../board/new?error=true");
            } else {
                var newBoard = new Board();
                newBoard.title = title;
                newBoard.description = desc;
                newBoard.orderIndex = boards.length;
                newBoard.save(function(err) {
                    res.redirect("../board/new?success=true");
                });
            }
        });
    });

    //View a board's topics
    app.get("/board", function(req, res) {
        if(req.query.board) {
            Board.find({}, function(err, boards) {
                var board = boards[req.query.board];
                res.render("board.ejs", {
                    title : config.title,
                    loggedIn : req.isAuthenticated(),
                    user : req.user,
                    board : board,
                    boardIndex : req.query.board
                });
            });
        } else {
            res.redirect("/");
        }
    });
}