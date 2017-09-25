// /app/routes/route_index.js

module.exports = function(config, app) {
    //===============================================
    //===========Home================================
    //===============================================
    app.get('/', function(req, res) {
        res.render('index.ejs', {
            title : config.title,
            loggedIn : req.isAuthenticated()
        });
    });
}