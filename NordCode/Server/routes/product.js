
const express = require('express');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const product = require('../models/Product.js');

const router = express.Router();
router.get('/getproductall', (req, res, next) => {
    var name = req.query.Name;
    product.findAll().then(products => {
        res.json(products);
    }).catch(err => {
        console.log('Error ' + err);
    });
});
router.get('/getproducts', (req, res, next) => {
    var name = req.query.Name
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
    var name = req.query.Name;
    product.findAll({ where: { [Op.or]: [{ Brand: { [Op.like]: '%' + name + '%', } }, { Category: { [Op.like]: '%' + name + '%', } }] } }
    ).then(products => {
        res.json(products);
    }).catch(err => {
        console.log('Error ' + err);
    });
});

router.get('/getproductbyproductid', (req, res, next) => {
    var ProductId = req.query.ProductId;
    product.findByPk(ProductId).then(products => {
        res.json(products);
    }).catch(err => {
        console.log('Error ' + err);
    });
});
router.post('/createProduct', (req, res, next) => {

    if (!req.body) {
        res.status(400);
        res.json({ error: 'Bad data request' + req.body });
    }
    else {
        var pid = req.body.PID;
        console.log(req.body.PID);
        if (pid == 0) {
            product.create(req.body)
                .then(data => {
                    res.send(data);
                }).catch(err => {
                    console.log('Error :' + err);
                });
        } else {
            product.update(req.body, { where: { PID: req.body.PID } })
                .then(data => {
                    res.send(data);
                }).catch(err => {
                    console.log('Error :' + err);
                });
        }
    }
});

router.get('/deleteProduct', (req, res, next) => {
    var pid = req.query.pid;
    if (pid = 0) {
        res.status(400);
        res.json({ error: 'Bad Request' + req.params });
    }
    else {
        product.destroy({ where: { PID: req.query.pid } })
            .then(data => {
                res.send(data);
            }).catch(err => {
                console.log('Error :' + err);
            });
    }
});


module.exports = router;