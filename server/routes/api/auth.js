const passport = require('passport');
const router = require('express').Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// auth/
// todo check input
router.post('/signIn', auth.optional, (req, res, next) => {
    const { login, password } = req.body;

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if(err) {
          return next(err);
        }
    
        if(passportUser) {
          const user = passportUser;
          user.token = passportUser.generateJWT();
    
          return res.json({ user: user.toAuthJSON() });
        }
    
        return status(400).info;
      })(req, res, next);
});

// todo check input
router.post('/signUp', auth.optional, function(req, res) {
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

router.get('/logOut', auth.optional, function(req, res) {
    req.logout();
    return res.sendStatus(200);
})

module.exports = router;