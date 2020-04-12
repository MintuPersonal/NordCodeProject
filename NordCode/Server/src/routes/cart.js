
const express = require('express');
const cart = require('../models/Cart.js')
const router = express.Router();

router.get('/getaddtocart', (req, res, next) => {
    var cid = 1; //req.body.CID;
    cart.findAll({ where: { CID: cid } }).then(addtocarts => {
        res.json(addtocarts);
    }).catch(err => {
        console.log('Error ' + err);
    });
});

router.post('/addtocart', (req, res, next) => {
    //  console.log(req.body);
    if (!req.body) {
        res.status(400);
        res.json({ error: 'Bad data request' + req.body });
    }
    else {
        cart.create(req.body).then(data => {
            res.json({
                status: true,
                msg: 'Add to cart successfully'
            });
            // res.send(data);
        }).catch(err => {
            console.log('Error :' + err);
        });
    }
});

module.exports = router;