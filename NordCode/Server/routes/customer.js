const express = require('express');
const customer = require('../models/Customer.js')
const router = express.Router();

router.get(process.env.api_get_customer, (req, res, next) => {
    //var customerid = req.body.customerid; for x-www-urlencoded 
    var cmobileno = req.query.cmobileno;
    console.log(cmobileno);
    customer.findAll({ where: { MobileNo: cmobileno }, limit: 1 }).then(customer => {
        res.json(customer);
    }).catch(err => {
        console.log('Error ' + err);
    });
});

router.post(process.env.api_set_customer, (req, res, next) => {
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