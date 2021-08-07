const router = require('express').Router();
const auth = require('../../middleware/auth');
const render = require('../../utils/renderHtml');
const Topic = require('../../models/Topic');
const winston = require('../../config/winston');

// topics/
// todo check
router.post('/', auth.required, (req, res) => {
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
router.get('/:id', auth.optional, async (req, res) => {
    const id = req.params.id;
    const topic = await Topic.findById(id);
    return res.json(topic);
});

// todo check
router.post('/:id', auth.required, async (req, res) => {
    const id = req.params.id;
    const topic = await Topic.findById(id);

    topic.name = req.body.name;
    topic.fullText = req.body.text;

    await topic.save();
    return res.json(topic);
});

// todo check
router.get('/delete/:id', auth.required, async (req, res) => {
    const id = req.params.id;
    await Topic.findByIdAndDelete(id);

    return res.sendStatus(200);
});

module.exports = router;