const express = require('express');
const customer = require('../models/Customer.js');
const order = require('../models/Order.js');
const OrderDetails = require('../models/OrderDetails.js');
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

router.get(process.env.api_get_orders, (req, res, next) => {
    //var customerid = ''; //req.body.customerid; for x-www-urlencoded 
    var customerid = req.query.customerid;
    console.log(customerid);

    order.findAll({ where: { CustomerId: customerid } }).then(order => {
        res.json(order);
    }).catch(err => {
        console.log('Error ' + err);
    });
});
router.get(process.env.api_get_order, (req, res, next) => {
    var customerid = ''; //req.body.customerid; for x-www-urlencoded 
    var cmobileno = req.query.cmobileno;
    console.log(cmobileno);

    order.findAll({ where: { CustomerId: customerid }, limit: 1 }).then(order => {
        res.json(order);
    }).catch(err => {
        console.log('Error ' + err);
    });
});

router.get(process.env.api_get_orderdetails, (req, res, next) => {
    var orderno = req.query.orderno;
    console.log(orderno);

    OrderDetails.findAll({ where: { TONumber: orderno } }).then(order => {
        res.json(order);
    }).catch(err => {
        console.log('Error ' + err);
    });
});

router.post(process.env.api_set_order, (req, res, next) => {
    //console.log(JSON.parse(req.body.cartItems) + ' Cart test');
    var homeobj = {};
    var orderId;
    if (!req.body) {
        res.status(400);
        res.json({ error: 'Bad data request' + req.body });
    } else {
        order.create(req.body).then(order => {
            homeobj.order = order;
            orderId = order.Id;
        }).catch(err => {
            console.log('Error :' + err);
        });

        var product = req.body.OrderDetails[0];
        product.OrderId = orderId;
        OrderDetails.create(product).then(product => {
            console.log(product.lenght)
            res.json({
                data: homeobj,
                status: true,
                msg: 'Order submitted successfully'
            });
        });
    };
});



// router.post(process.env.api_set_updateorder, (req, res, next) => {
//     //console.log(req.body.OrderNo + ' test');
//     var orderobj = {};
//     if (!req.body) {
//         res.status(400);
//         res.json({ error: 'Bad data request' + req.body });
//     } else {

//         product.create(req.body).then(product => {
//             console.log(product.lenght)
//                 //orderobj.order.TotalItem = product.lenght;
//                 // res.json({
//                 //     data = orderobj,
//                 //     status: true,
//                 //     msg: 'Order submitted successfully'
//                 // });
//         });

//         order.create(req.body).then(order => {
//             res.json({
//                 order: order,
//                 status: true,
//                 msg: 'Order submitted successfully'
//             });
//             // res.send(data);
//             orderobj.order = order;
//         }).catch(err => {
//             console.log('Error :' + err);
//         });

//     };
// });

module.exports = router;