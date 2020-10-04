const router = require('express').Router();
const Topic = require('../models/Topic');

router.post('/', (req, res) => {
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

router.get('/:name', async (req, res) => {
    const topicName = req.params.name;
    const topic = await Topic.findOne({name: topicName});
    res.render('topic.html', { topic: topic });
});

router.post('/:name', async (req, res) => {
    const topicName = req.params.name;
    const topic = await Topic.findOne({name: topicName});

    topic.name = req.body.name;
    topic.fullText = req.body.text;

    await topic.save();
});

module.exports = router;