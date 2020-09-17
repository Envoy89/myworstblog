const router = require('express').Router();
const isAuth = require('../middleware/auth');

router.use(isAuth);

router.get('/', async function(req, res) {
    res.render('adminTest.html');
});

module.exports = router;