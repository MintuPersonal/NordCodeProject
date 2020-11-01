const express = require('express');
const menu = require('../models/APImodels/Menu.js')
const Product = require('../models/APImodels/Product.js')
const router = express.Router();

router.get('/getmenus', (req, res, next) => {
    var Role = req.body.Role;
    Product.findAll({
        where: { Active: 1 },
        order: [
            ['Category', 'ASC'],
        ],
        attributes: [
            ['PID', 'Id'], 'route', 'iconName', ['PName', 'Text'], 'Description', 'ParentId', 'RankId'
        ]
    }).then(menus => {
        res.json({
            "status": true,
            "msg": "Order find successfully",
            data: menus
        });
    }).catch(err => {
        console.log('Error ' + err);
    });
});


module.exports = router;