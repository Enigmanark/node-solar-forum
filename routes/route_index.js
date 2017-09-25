// /app/routes/route_index.js

module.exports = function(config, app) {
    //===============================================
    //===========Home================================
    //===============================================
    app.get('/', function(req, res) {
        res.render('index.ejs', {
            title : config.title
        });
    });

    app.use(function(req, res, next) {
        res.status(404).send("Sorry bro', can't find that!");
    });

}