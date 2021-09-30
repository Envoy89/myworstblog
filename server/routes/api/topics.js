const router = require('express').Router();
const passport = require('passport');
const Topic = require('../../models/Topic');
const winston = require('../../config/winston');
const { query, body, param, validationResult } = require('express-validator');

router.get(
    '/', 
    query('limit').exists().notEmpty(),
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const { limit: limitString } = req.query;
        const limit = (+limitString) || 10;
        
        const topics = await Topic.find().limit(limit);

        return res.json(topics);
});

// topics/
router.post(
    '/', 
    passport.authenticate('jwt', {session: false}), 
    body('name').notEmpty(),
    body('fullText').notEmpty(),
    (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        
        const newTopic = new Topic({
            name: req.body.name,
            fullText: req.body.fullText
        });

        newTopic.save((error, document) => {
            if (error) {
                winston.error(error.message);
                return res.status(500);
            }
        });

        return res.json(newTopic);
});

router.get(
    '/:id',
    param('id').notEmpty(),
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const id = req.params.id;
        try {
            const topic = await Topic.findById(id);
            return res.json(topic);
        } catch (e) {
            winston.error(e.message);
            return res.status(400).json({ message: 'Something wrong' });
        }
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
router.delete(
    '/:id', 
    passport.authenticate('jwt', {session: false}), 
    param('id').notEmpty(),
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const id = req.params.id;

        try {
            await Topic.findByIdAndDelete(id);
            return res.status(200).json({ message: 'Success delete' });
        } catch(e) {
            winston.error(e.message);
            return res.status(400).json({ message: 'Something wrong' });
        }
});

module.exports = router;