const router = require('express').Router();
const passport = require('passport');
const Topic = require('../../models/Topic');
const sendResponseWithError = require('../../utils/sendResponseWithError');
const { query, body, param, validationResult } = require('express-validator');

// topics/
router.get(
    '/', 
    query('limit').exists().notEmpty().isInt({ min: 1 }),
    query('pageNumber').exists().notEmpty().isInt({ min: 1}),
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return sendResponseWithError(res, errors.array());
        }

        try {
            const limit = +req.query.limit || 10;
            const pageNumber = +req.query.pageNumber || 1;

            const topicsCount = await Topic.count();
            const offset = limit * (pageNumber - 1);
            const topics = await Topic.find().limit(limit).skip(offset);

            return res.json({
                topics, topicsCount
            });
        } catch(e) {
            return sendResponseWithError(res, e.message);
        }
});

// topics/
router.post(
    '/', 
    passport.authenticate('jwt', {session: false}, () => {}),
    body('name').notEmpty(),
    body('fullText').notEmpty(),
    (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return sendResponseWithError(res, errors.array());
        }
        
        try {
            const newTopic = new Topic({
                name: req.body.name,
                fullText: req.body.fullText
            });

            newTopic.save();

            return res.json(newTopic);
        } catch(e) {
            return sendResponseWithError(res, e.message);
        }
});

router.get(
    '/:id',
    param('id').notEmpty(),
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return sendResponseWithError(res, errors.array());
        }

        try {
            const id = req.params.id;

            const topic = await Topic.findById(id);

            return res.json(topic);
        } catch (e) {
            return sendResponseWithError(res, e.message);
        }
});

// todo check
router.post(
    '/:id', 
    passport.authenticate('jwt', {session: false}), 
    param('id').notEmpty(),
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return sendResponseWithError(res, errors.array());
        }

        try {
            const id = req.params.id;
            const topic = await Topic.findById(id);

            topic.name = req.body.name;
            topic.fullText = req.body.fullText;

            await topic.save();

            return res.json(topic);
        } catch(e) {
            return sendResponseWithError(res, e.message);
        }
});

// todo check
router.delete(
    '/:id', 
    passport.authenticate('jwt', {session: false}), 
    param('id').notEmpty(),
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return sendResponseWithError(res, errors.array());
        }

        const id = req.params.id;

        try {
            await Topic.findByIdAndDelete(id);
            return res.status(200).json({ message: 'Success delete' });
        } catch(e) {
            return sendResponseWithError(res, e.message);
        }
});

module.exports = router;