const bodyParser = require('body-parser');
const Post = require('../models/Post');

module.exports = function(app) {

    app.get('/', async function(req, res) {
        const posts = await Post.find();
        res.render('index.html', { posts: posts });
    });

    app.post('/posts', bodyParser.urlencoded({ extended: true }), (req, res) => {
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

    app.get('/post/:name', async (req, res) => {
        const postName = req.params.name;
        const post = await Post.findOne({name: postName});
        res.render('post.html', { post: post });
    })
}