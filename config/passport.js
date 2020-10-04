const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'login',
    passportField: 'password'
}, (login, password, done) => {
    User.findOne({login})
        .then((user) => {
            if (!user || !user.validatePassword(password)) {
                return done(null, false, { error: { 'login or password': 'is invalid'}});
            }

            return done(null, user);
        }).catch(done);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        err ? done : done(null, user);
    });
});