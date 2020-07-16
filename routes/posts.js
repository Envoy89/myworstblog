const router = require('express').Router();
const Post = require('../models/Post');

router.post('/', (req, res) => {
    const newPost = new Post({
        name: req.body.name,
        text: req.body.text
    });

    newPost.save((error, document) => {
        if (error) {
            console.log(error);
        }
    })

    res.redirect('/');
});

router.get('/:name', async (req, res) => {
    const postName = req.params.name;
    const post = await Post.findOne({name: postName});
    res.render('post.html', { post: post });
});

router.post('/:name', async (req, res) => {
    const postName = req.params.name;
    const post = await Post.findOne({name: postName});

    post.name = req.body.name;
    post.text = req.body.text;

    await post.save();
});

module.exports = router;