// /routes/route_account.js

module.exports = function(config, app, passport) {
    app.use('/account/new', function(req, res) {
        res.render('register.ejs', {
            title : config.title
        })
    })
}