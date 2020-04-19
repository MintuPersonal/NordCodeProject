const { Op } = require("sequelize");
const express = require('express');
const jwt = require('jsonwebtoken');

const home = require('../models/Home.js');
const banner = require('../models/Banner.js');
const brand = require('../models/Brand.js');
const popular = require('../models/Popular.js');
const feature = require('../models/Feature.js');
const Product = require('../models/Product.js');

const router = express.Router();

router.get('/gethome', (req, res, next) => {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    // jwt.verify(token, 'secretkey', (err, authData) => {
    //     if (err) {
    //         res.sendStatus(403);
    //     } else {
    var homeobj = {};
    home.findAll().then(homes => { //[Op.gt]: 6 { where: { parentid: 0 } } // { limit: 5 } // { where: { parentid: 0 } } // { where: { parentid: 0 } }
        homeobj.categories = homes;
    }).catch(err => { res.send('Error :' + err) });

    banner.findAll().then(banners => {
        homeobj.banners = banners;
    }).catch(err => { res.send('Error :' + err) });

    brand.findAll().then(brands => {
        homeobj.brands = brands;
    }).catch(err => { res.send('Error :' + err) });

    popular.findAll().then(populars => {
        homeobj.populars = populars;
    }).catch(err => { res.send('Error :' + err) });

    feature.findAll().then(features => {
        homeobj.features = features;
        console.log(features);
        res.json({
            status: true,
            msg: 'Data has been loaded successfully',
            homeobj
        });
    }).catch(err => { res.send('Error :' + err) });
    //        }
    //     });
});


router.get('/gethomes', (req, res, next) => {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    // jwt.verify(token, 'secretkey', (err, authData) => {
    //     if (err) {
    //         res.sendStatus(403);
    //     } else {
    var homeobj = {};
    Product.findAll({ where: { Active: 1, Rol: 0 } }).then(homes => { //[Op.gt]: 6 { where: { parentid: 0 } } // { limit: 5 } // { where: { parentid: 0 } } // { where: { parentid: 0 } }
        homeobj.categories = homes;
    }).catch(err => { res.send('Error :' + err) });

    banner.findAll().then(banners => {
        homeobj.banners = banners;
    }).catch(err => { res.send('Error :' + err) });

    brand.findAll().then(brands => {
        homeobj.brands = brands;
    }).catch(err => { res.send('Error :' + err) });

    Product.findAll({ where: { Active: 1, Rol: 1, } })
        .then(products => {
            homeobj.products = products;
        }).catch(err => { res.send('Error :' + err) });

    popular.findAll().then(populars => {
        homeobj.populars = populars;
    }).catch(err => { res.send('Error :' + err) });

    feature.findAll().then(features => {
        homeobj.features = features;
        res.json({
            status: true,
            msg: 'Data has been loaded successfully',
            homeobj
        });
    }).catch(err => { res.send('Error :' + err) });
    //        }
    //     });
});

module.exports = router;