const express = require('express');
const menu = require('../models/Menu.js')
const Product = require('../models/Product.js')
const router = express.Router();


router.get('/getmenus', (req, res, next) => {
    var Role = req.body.Role;
    Product.findAll({
            where: { Active: 1 },
            order: [
                ['Category', 'ASC'],
            ],
            attributes: [
                ['PID', 'Id'], 'route', 'iconName', ['PName', 'Text'], 'Description', 'ParentId', 'RankId',
                //['PName', 'Desc'],
                // Product.sequelize.literal("route || ' ' || Category"), 'route'
            ]
        }

    ).then(menus => {
        res.json({
            "status": true,
            "msg": "Order find successfully",
            data: menus
        });
        //console.log(JSON.parse(menus));
    }).catch(err => {
        console.log('Error ' + err);
    });

    // var Role = req.body.Role;
    // console.log(Role);
    // menu.findAll().then(menus => { //{ where: { Role: Role } }
    //     res.json(
    //         menus
    //     );
    //     console.log(JSON.parse(menus));
    // }).catch(err => {
    //     console.log('Error ' + err);
    // });

    //readFileSync
    // const fs = require('fs');
    // fs.readFile('./database/data/menu-data.json', 'utf8', (err, data) => {
    //     if (err) throw err;
    //     let student = JSON.parse(data);
    //     console.log(student);
    //     res.json(student);
    // });
});


module.exports = router;