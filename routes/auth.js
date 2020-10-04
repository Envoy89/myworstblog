const passport = require('passport');
const router = require('express').Router();
const User = require('../models/User');

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

router.get('/signIn', function(req, res) {
    res.render('signIn.html');
});

router.get('/signUp', function(req, res) {
    res.render('signUp.html');
});

router.get('/logOut', function(req, res) {
    req.logout();
    res.redirect('/');
})

module.exports = router;