const router = require('express').Router();
const Topic = require('../models/Topic');

router.post('/', (req, res) => {
    const newTopic = new Topic({
        name: req.body.name,
        text: req.body.text
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
    const topic = await topi.findOne({name: topicName});

    topi.name = req.body.name;
    topi.text = req.body.text;

    await topic.save();
});

module.exports = router;