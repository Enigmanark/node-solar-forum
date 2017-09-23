module.exports = function(app, passport) {
    //===============================================
    //===========Home================================
    //===============================================
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.use(function(req, res, next) {
        res.status(404).send("Sorry bro', can't find that!");
    });

}