const passport = require('passport');
const LocalStrategy = require('passport-local');
const winston = require('./winston');
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/User');
const config = require('config');

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

            winston.debug(`Success login ${user.login}`);
            return done(null, user);
        }).catch((err) => {
            winston.error(err.message);
            return done(null, false, { message: 'Something wrong.' });
        });
}));

// todo get secret from file
passport.use(new JwtStrategy({
        jwtFromRequest: req => req.cookies[config.get('JwtTokenName')],
        secretOrKey: 'secret2',
    },
    (jwtPayload, done) => {
        if (Date.now() > jwtPayload.exp) {
            return done('jwt expired');
        }

        return done(null, jwtPayload);
    }
));

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