const router = require('express').Router();
const render = require('../utils/renderHtml');
const Topic = require('../models/Topic');

router.get('/', async function(req, res) {
    const topics = await Topic.find();
    render(req, res, 'index.html', { topics })
});

router.use('/topics', require('./topics'));
router.use('/auth', require('./auth'));

module.exports = router;