const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');

// todo add loger, log user activity
passport.use(new LocalStrategy({
    usernameField: 'login',
    passportField: 'password'
}, (login, password, done) => {
    User.findOne({login})
        .then((user) => {
            if (!user || !user.validatePassword(password)) {
                // todo get error from file
                return done(null, false, { error: { 'login or password': 'is invalid'}});
            }

            return done(null, user);
        // todo add catch error message
        }).catch(done);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        // todo add done with message
        err ? done : done(null, user);
    });
});