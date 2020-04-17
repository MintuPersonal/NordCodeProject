const express = require('express');

const Setting = require('../models/Setting.js');

const router = express.Router();
router.get('/getsettingall', (req, res, next) => {
    var name = req.query.Name;
    console.log('Test Name: ' + name)
    Setting.findAll().then(setting => {
        res.json({
            status: true,
            msg: 'Data loaded successfully',
            setting: setting
        });
    }).catch(err => {
        console.log('Error ' + err);
    });
});

module.exports = router;