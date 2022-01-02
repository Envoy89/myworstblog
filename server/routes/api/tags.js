const sendResponseWithError = require("../../utils/sendResponseWithError");
const passport = require("passport");
const {body, validationResult, query, param} = require("express-validator");
const router = require('express').Router();
const Tag = require('../../models/Tag');

// /tags
router.get(
    '/',
    query('limit').exists().notEmpty().isInt({ min: 1 }),
    query('pageNumber').exists().notEmpty().isInt({ min: 1}),
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return sendResponseWithError(res, errors.array());
        }

        try {
            const limit = +req.query.limit || 10;
            const pageNumber = +req.query.pageNumber || 1;

            const tagCount = await Tag.count();
            const offset = limit * (pageNumber - 1);
            const tags = await Tag.find().limit(limit).skip(offset);

            return res.json({
                tags, tagCount
            });
        } catch(e) {
            return sendResponseWithError(res, e.message);
        }
    } catch (e) {
        return sendResponseWithError(res, e.message);
    }
})

router.post(
    '/',
    passport.authenticate('jwt', {session: false}),
    body('name').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return sendResponseWithError(res, errors.array());
        }

        try {
            const newTag = new Tag({
                name: req.body.name
            });

            await newTag.save();

            return res.json(newTag);
        } catch (e) {
            return sendResponseWithError(res, e.message);
        }
})

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

            const topic = await Tag.findById(id);

            return res.json(topic);
        } catch (e) {
            return sendResponseWithError(res, e.message);
        }
});


router.post(
    '/:id',
    passport.authenticate('jwt', {session: false}),
    param('id').notEmpty(),
    body('name').notEmpty(),
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return sendResponseWithError(res, errors.array());
        }

        try {
            const id = req.params.id;
            const topic = await Tag.findById(id);

            topic.name = req.body.name;

            await topic.save();

            return res.json(topic);
        } catch(e) {
            return sendResponseWithError(res, e.message);
        }
});

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
            await Tag.findByIdAndDelete(id);
            return res.status(200).json({ message: 'Success delete' });
        } catch(e) {
            return sendResponseWithError(res, e.message);
        }
});

module.exports = router;