const router = require('express').Router();

router.use('/topics', require('./api/topics'));
router.use('/auth', require('./api/auth'));

module.exports = router;