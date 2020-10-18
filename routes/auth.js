const passport = require('passport');
const router = require('express').Router();
const render = require('../utils/renderHtml');
const User = require('../models/User');

// auth/

router.get('/signIn', function(req, res) {
    render(req, res, 'signIn.html');
});

router.get('/signUp', function(req, res) {
    render(req, res, 'signUp.html');
});

router.post('/signIn', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/singIn'
}));

router.post('/signUp', function(req, res) {
    const { login, password } = req.body;

    if (login) {
        const newUser = new User({
            login: login,
        });

        newUser.setPassword(password);
        newUser.save((error, document) => {
            console.log(error);
        });
    }

    res.redirect('/');
});

router.get('/logOut', function(req, res) {
    req.logout();
    res.redirect('/');
})

module.exports = router;