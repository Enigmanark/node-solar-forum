// /routes/route_topic.js

var Board = require("../app/models/Board.js");
var IsLoggedIn = require("../app/isLoggedIn.js");

module.exports = function(config, app) {
    //Create a new topic on board
    app.get("/board/topic/new", IsLoggedIn, function(req, res) {
        if(req.query.success && req.query.board) {
            req.flash("success", "Your topic was successfully created.");
        }
        if(req.query.board) {
            res.render("newTopic.ejs", {
                board : req.query.board,
                title : config.title,
                loggedIn : req.isAuthenticated(),
                user : req.user,
                success : req.flash("success")
            });
        }
        else {
            res.redirect("/");
        }
    });

    //Process new topic form
    app.post("/board/topic/new", IsLoggedIn, function(req, res) {
        Board.find( {}, function(err, boards) {
            var board = boards[req.query.board];
            var newTopicIndex = board.topics.length;
            var newTopic = new Object();
            var date = new Date();
            newTopic.title = req.body.title;
            newTopic.posts = [];
            newTopic.posts[0] = new Object();
            newTopic.posts[0].content = req.body.content;
            newTopic.posts[0].author = req.user.userName;
            newTopic.posts[0].date = date;
            newTopic.posts[0].dateString = date.toLocaleString();
            board.topics[newTopicIndex] = newTopic;
            //Internal arrays are not saved unless you mark them as modified
            board.markModified('topics');
            board.save(function(err) {
                res.redirect("/board/topic/new?success=true&board=" + req.query.board);
            });
        });
    });

    //Show all posts for topic
    app.get("/board/topic", function(req, res) {
        var boardIndex = req.query.board;
        var topicIndex = req.query.topic;
        if(boardIndex && topicIndex) {
            Board.find( {}, function(err, boards) {
                var topic = boards[boardIndex].topics[topicIndex];
                res.render("topic.ejs", {
                    title : config.title,
                    loggedIn : req.isAuthenticated(),
                    user : req.user,
                    boardTitle : boards[boardIndex].title,
                    topicTitle : boards[boardIndex].topics[topicIndex].title,
                    posts : boards[boardIndex].topics[topicIndex].posts.reverse(),
                    boardIndex : boardIndex,
                    topicIndex : topicIndex
                });
            })
        } else { res.redirect("/"); }
    });

};