const express = require('express');
const customer = require('../models/Customer.js')
const router = express.Router();

router.get('/getaddtocart', (req, res, next) => {
    var cid = 1; //req.body.CID;
    customer.findAll({ where: { CID: cid } }).then(order => {
        res.json(order);
    }).catch(err => {
        console.log('Error ' + err);
    });
});

router.post('/setcustomer', (req, res, next) => {
    if (!req.body) {
        res.status(400);
        res.json({ error: 'Bad data request' + req.body });
    } else {
        customer.create(req.body).then(data => {
            res.json({
                status: true,
                msg: 'Add to cart successfully'
            });
        }).catch(err => {
            console.log('Error :' + err);
        });
    }
});

module.exports = router;