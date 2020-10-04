const router = require('express').Router();
const Topic = require('../models/Topic');

router.get('/', async function(req, res) {
    const topics = await Topic.find();
    res.render('index.html', { topics: topics });
});

router.use('/topics', require('./topics'));
router.use('/adminTest', require('./adminTest'));
router.use('/auth', require('./auth'));

module.exports = router;