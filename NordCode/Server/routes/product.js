
const express = require('express');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const product = require('../models/Product.js');

const router = express.Router();
router.get('/getproducts', (req, res, next) => {
    var name = req.body.Name;
    product.findAll({
        where: {
            [Op.or]: [{ PName: { [Op.like]: '%' + name + '%', } }, { Brand: { [Op.like]: '%' + name + '%', } },
            { Category: { [Op.like]: '%' + name + '%', } }, { Description: { [Op.like]: '%' + name + '%', } }]
        }
    }).then(products => {
        res.json(products);
    }).catch(err => {
        console.log('Error ' + err);
    });
});

router.get('/getproductsbyparam', (req, res, next) => {
    var name = req.body.Name;
    product.findAll({ where: { [Op.or]: [{ Brand: { [Op.like]: '%' + name + '%', } }, { Category: { [Op.like]: '%' + name + '%', } }] } }
    ).then(products => {
        res.json(products);
    }).catch(err => {
        console.log('Error ' + err);
    });
});

router.get('/getproductbyproductid', (req, res, next) => {
    var ProductId = req.body.ProductId;
    product.findByPk(ProductId).then(products => {
        res.json(products);
    }).catch(err => {
        console.log('Error ' + err);
    });
});
module.exports = router;