const passport = require('passport');
const LocalStrategy = require('passport-local');
const winston = require('./winston');
const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'login',
    passportField: 'password'
}, (login, password, done) => {
    User.findOne({login})
        .then((user) => {
            if (!user || !user.validatePassword(password)) {
                winston.debug('Incorrect login or password.');
                return done(null, false, { message: 'Incorrect login or password.' });
            }

            winston.debug(`Success login ${user}`);
            return done(null, user);
        }).catch((err) => {
            winston.error(err.message);
            return done(null, false, { message: 'Something wrong.' });
        });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if (err) {
            winston.error(err.message);
            return done(null, false, { message: 'Something wrong.' })
        }
        return done(null, user);
    });
});