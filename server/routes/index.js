const router = require('express').Router();

router.get('/ping', (req, res) => {
    res.status(200).send({message: 'Successfule ping'});
})

router.use('/api/topics', require('./api/topics'));
router.use('/api/tags', require('./api/tags'));
router.use('/api/auth', require('./api/auth'));

module.exports = router;