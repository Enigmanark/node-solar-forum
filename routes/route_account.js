// /routes/route_account.js

module.exports = function(config, app, passport) {
    
    app.get('/account/register', function(req, res) {
        res.render('./account/register.ejs', {
            title : config.title,
            loggedIn: req.isAuthenticated()
        })
    })
}