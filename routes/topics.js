const router = require('express').Router();
const isAuth = require('../middleware/auth');
const render = require('../utils/renderHtml');
const Topic = require('../models/Topic');

// todo remove all console.log, add loger, get error message from file
router.post('/', isAuth, (req, res) => {
    const newTopic = new Topic({
        name: req.body.name,
        fullText: req.body.text
    });

    newTopic.save((error, document) => {
        if (error) {
            console.log(error);
        }
    })

    res.redirect('/');
});

router.get('/', isAuth, (req, res) => {
    render(req, res, 'addNewTopic.html');
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const topic = await Topic.findById(id);
    render(req, res, "topic.html", { topic } )
});

router.post('/:id', isAuth, async (req, res) => {
    const id = req.params.id;
    const topic = await Topic.findById(id);

    topic.name = req.body.name;
    topic.fullText = req.body.text;

    await topic.save();
});

router.get('/delete/:id', isAuth, async (req, res) => {
    const id = req.params.id;
    await Topic.findByIdAndDelete(id);

    res.redirect('/');
});

module.exports = router;