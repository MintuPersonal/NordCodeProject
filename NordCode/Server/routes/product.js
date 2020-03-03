
const express = require('express');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const product = require('../models/Product.js');

const router = express.Router();
router.get('/getproducts', (req, res, next) => {
    var name = req.body.Name;
    product.findAll({
        where: {
            PName: { [Op.like]: '%' + name + '%', },
            [Op.or]: { Brand: { [Op.like]: '%' + name + '%', } },
            [Op.or]: { Category: { [Op.like]: '%' + name + '%', } },
            [Op.or]: { Description: { [Op.like]: '%' + name + '%', } },

            //[Op.or]: { PName_BN: { [Op.like]: '%' + name + '%', } },
            // [Op.or]: { Brand_BN: { [Op.like]: '%' + name + '%', } },
            // [Op.or]: { Category_BN: { [Op.like]: '%' + name + '%', } },
            // [Op.or]: { Description_BN: { [Op.like]: '%' + name + '%', } }
        }
    }).then(products => {
        res.json(products);
    }).catch(err => {
        console.log('Error ' + err);
    });
});

module.exports = router;