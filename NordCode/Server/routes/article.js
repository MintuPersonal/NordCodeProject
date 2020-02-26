
const express = require('express');
const article = require('../models/Article.js');

const router = express.Router();
router.get('/getarticle', (req, res, next) => {
    article.findAll().then(articles => {
        res.json(articles);
    }).catch(err => { res.send('Error :' + err) });
});

module.exports = router;