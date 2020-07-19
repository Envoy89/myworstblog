const router = require('express').Router();
const auth = require('./auth');

router.get('/', auth.required, (req, res) => {
    res.render('adminTest.html', { test: 'my name is test'}); 
});

module.exports = router;