const sendResponseWithError = require("../../utils/sendResponseWithError");
const passport = require("passport");
const {body, validationResult, query, param} = require("express-validator");
const router = require('express').Router();
const Tag = require('../../models/Tag');

const TAG_NOT_FOUND = 'Тэг не найден';

// /tags
router.get(
    '/',
    passport.authenticate('jwt', {session: false}),
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

                const tagCount = await Tag.count({
                    user: req.user.id
                });
                const offset = limit * (pageNumber - 1);
                const tags = await Tag.find({
                    user: req.user.id
                }).limit(limit).skip(offset);

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
                name: req.body.name,
                user: req.user.id
            });

            await newTag.save();

            return res.json(newTag);
        } catch (e) {
            return sendResponseWithError(res, e.message);
        }
})

router.get(
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

            const tag = await Tag.findOne({
                _id: id,
                user: req.user.id
            });

            if (!tag) {
                return res.status(404).json({
                    message: TAG_NOT_FOUND
                });
            }

            return res.json(tag);
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
            const tag = await Tag.findOne({
                _id: id,
                user: req.user.id
            });

            if (!tag) {
                return res.status(404).json({
                    message: TAG_NOT_FOUND
                });
            }

            tag.name = req.body.name;

            await tag.save();

            return res.json(tag);
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
            const tag = await Tag.findOne({
                _id: id,
                user: req.user.id
            });

            if (!tag) {
                return res.status(404).json({
                    message: TAG_NOT_FOUND
                });
            }

            await Tag.findOneAndDelete({
                _id: id,
                user: req.user.id
            });

            return res.status(200).json({ message: 'Success delete' });
        } catch(e) {
            return sendResponseWithError(res, e.message);
        }
});

module.exports = router;