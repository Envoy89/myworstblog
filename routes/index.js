const bodyParser = require('body-parser');
const Post = require('../models/Post');

module.exports = function(app) {

    app.get('/', async function(req, res) {
        const posts = await Post.find();
        console.log(posts);
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
            console.log(document);
        })

        res.redirect('/');
    });
}