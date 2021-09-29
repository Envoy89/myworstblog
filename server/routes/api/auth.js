const passport = require('passport');
const winston = require('./winston');
const config = require('config');
const router = require('express').Router();
const User = require('../../models/User');

// auth/
router.post('/login', (req, res, next) => {
    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if(err || !passportUser) {
            winston.error(info);
            return res.status(400).json(info);
        }

        const user = passportUser;
        user.token = passportUser.generateJWT();

        res.cookie(config.get('JwtTokenName'), user.token, { httpOnly: true });
        return res.status(200).json({ user: user.toAuthJSON() });
      })(req, res, next);
});

// todo check input
router.post('/register', function(req, res) {
    const { login, password } = req.body;

    if (login && password) {
        const newUser = new User({
            login: login,
        });

        newUser.setPassword(password);
        newUser.save((error) => {
            winston.error(error);
            return res.sendStatus(500);
        });
    }

    return res.sendStatus(200);
});

router.get('/logOut', function(req, res) {
    res.cookie(config.get('JwtTokenName'), '', {expires: new Date(0)});
    return res.status(200).json({message: "Success log out"});
})

module.exports = router;