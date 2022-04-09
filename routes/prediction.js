const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.get('/templates/resultshtml.html', (req, res) => {
    res.render('resultshtml.html');
})


module.exports = router;