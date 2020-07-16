const router = require('express').Router();
const Post = require('../models/Post');

router.get('/', async function(req, res) {
    const posts = await Post.find();
    res.render('index.html', { posts: posts });
});

router.use('/posts', require('./posts'));

module.exports = router;