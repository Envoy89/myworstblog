const passport = require('passport');
const { body, validationResult } = require('express-validator');
const winston = require('../../config/winston');
const config = require('config');
const router = require('express').Router();
const User = require('../../models/User');

// auth/
router.post('/login', (req, res, next) => {
    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if(err || !passportUser) {
            winston.error(info);
            return res.status(400).send(info);
        }

        const user = passportUser;
        user.token = passportUser.generateJWT();

        res.cookie(config.get('JwtTokenName'), user.token, { httpOnly: true });
        return res.status(200).json({ user: user.toAuthJSON() });
      })(req, res, next);
});

router.post(
    '/register', 
    body('login').notEmpty(),
    body('password').notEmpty().isLength({ min: 5 }),
    async function(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).statusMessage(errors.array());
        }

        const { login, password } = req.body;

        const existUser = await User.findOne({login});
        if (existUser) {
            return res.status(400).json({ message: "User exist"});
        }
        
        const newUser = new User({
            login: login,
        });

        newUser.setPassword(password);
        await newUser.save((error) => {
            winston.error(error);
            return res.status(500).json({ message: 'Something wrong.' });
        });
        

        return res.sendStatus(200);
});

router.get('/logOut', function(req, res) {
    res.cookie(config.get('JwtTokenName'), '', {expires: new Date(0)});
    return res.status(200).json({message: "Success log out"});
})

module.exports = router;