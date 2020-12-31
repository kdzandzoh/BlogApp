const router = require('express').Router()
const { ensureAuthenticated } = require('../auth')

router.get('/', (req, res) => {
    res.render('welcome');
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        user: req.user
    });
})


module.exports = router;