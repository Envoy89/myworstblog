const router = require('express').Router();
const passport = require('passport');
const Topic = require('../../models/Topic');
const winston = require('../../config/winston');

// todo add checks
router.get('/', async (req, res) => {
    const { limit: limitString } = req.query;
    const limit = (+limitString) || 10;
    console.log(limit);
    const topics = await Topic.find().limit(limit);

    return res.json(topics);
});

// topics/
// todo check
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const newTopic = new Topic({
        name: req.body.name,
        fullText: req.body.text
    });

    newTopic.save((error, document) => {
        if (error) {
            winston.error(error.message);
            return res.sendStatus(500);
        }
    });

    return res.json(newTopic);
});

// todo check
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const topic = await Topic.findById(id);
    return res.json(topic);
});

// todo check
router.post('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const id = req.params.id;
    const topic = await Topic.findById(id);

    topic.name = req.body.name;
    topic.fullText = req.body.text;

    await topic.save();
    return res.json(topic);
});

// todo check
router.get('/delete/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const id = req.params.id;
    await Topic.findByIdAndDelete(id);

    return res.sendStatus(200);
});

module.exports = router;