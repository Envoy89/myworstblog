const passport = require('passport');
const router = require('express').Router();
const User = require('../../models/User');

// auth/
// todo check input
router.post('/login', (req, res, next) => {
    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if(err || !passportUser) {
            res.status(400).json(info);
        }

        const user = passportUser;
        user.token = passportUser.generateJWT();

        res.cookie('token', user.token, { httpOnly: true, secure: true  });
        res.status(200).json({ user: user.toAuthJSON() });
        
        return res.sendStatus(400).info;
      })(req, res, next);
});

// todo check input
router.post('/register', function(req, res) {
    const { login, password } = req.body;

    if (login) {
        const newUser = new User({
            login: login,
        });

        newUser.setPassword(password);
        newUser.save((error, document) => {
            console.log(error);
            return res.sendStatus(500);
        });
    }

    return res.sendStatus(200);
});

// todo fix logout
router.get('/logOut', function(req, res) {
    req.logout();
    return res.sendStatus(200);
})

module.exports = router;