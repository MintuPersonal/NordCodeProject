
const express = require('express');
const jwt = require('jsonwebtoken');

const home = require('../models/Home.js');
const banner = require('../models/Banner.js');
const brand = require('../models/Brand.js');
const popular = require('../models/Popular.js');
const feature = require('../models/Feature.js');

const router = express.Router();

router.get('/gethome', (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            var homeobj = {};
            home.findAll({ where: { parentid: 0 } }).then(homes => {
                homeobj.categories = homes;
            }).catch(err => { res.send('Error :' + err) });

            banner.findAll({ limit: 5 }).then(banners => {
                homeobj.banners = banners;
            }).catch(err => { res.send('Error :' + err) });

            brand.findAll({ where: { parentid: 0 } }).then(brands => {
                homeobj.brands = brands;
            }).catch(err => { res.send('Error :' + err) });

            popular.findAll({ where: { parentid: 0 } }).then(populars => {
                homeobj.populars = populars;
            }).catch(err => { res.send('Error :' + err) });

            feature.findAll({}).then(features => {
                homeobj.features = features;
                res.json({ 
                    status: true,
                    msg: 'Data has been loaded Sucessfully',
                    homeobj });
            }).catch(err => { res.send('Error :' + err) });
        }
    });
});

module.exports = router;