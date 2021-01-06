const config = require('config');

module.exports = (req, res, next) => {
    req.isAuthenticated() ? next() : res.redirect(config.get('Urls.auth.signIn'));
}