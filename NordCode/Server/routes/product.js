
const express = require('express');
const product = require('../models/Product.js');

const router = express.Router();
router.get('/getproduct', (req, res, next) => {
    product.findAll().then(products => {
        res.json(products);
    }).catch(err => {
        console.log('Error ' + err);
    });
});

module.exports = router;