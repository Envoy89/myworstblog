const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'user[login]',
    passportField: 'user[password]'
}, (login, password, done) => {
    User.findOne({login})
        .then((user) => {
            if (!user || !user.validatePassword(password)) {
                return done(null, false, { error: { 'login or password': 'is invalid'}});
            }

            return done(null, user);
        }).catch(done);
}));