const express = require('express');
const customer = require('../models/Customer.js')
const router = express.Router();

router.get('/getaddtocart', (req, res, next) => {
    //var customerid = req.body.customerid; for x-www-urlencoded 
    var customerid = req.query.customerid;
    console.log(customerid);
    customer.findAll({ where: { CID: customerid } }).then(customer => {
        res.json(customer);
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