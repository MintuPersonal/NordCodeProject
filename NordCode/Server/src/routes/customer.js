const express = require('express');
const Customer = require('../models/Customer.js');
const order = require('../models/Order.js');
const OrderDetails = require('../models/OrderDetails.js');
const router = express.Router();

router.get('/getcustomer', (req, res, next) => {
    var cmobileno = req.query.cmobileno;
    var cid = parseInt(cmobileno);
    var toNomber = '+880';
    Customer.findAll({ where: { MobileNo: cmobileno }, limit: 1 }).then(customer => {
        //console.log(JSON.stringify('DDD ' + customer.length));
        if (customer.length == 0) {
            customerobj = { CID: cid, TONumber: toNomber, MobileNo: cmobileno, CreateDate: new Date(), Delete: 0, Active: 1 }
            Customer.create(customerobj).then(data => {
                res.json({
                    status: true,
                    msg: 'User create successfully',
                    customer: [{ CID: cid, TONumber: toNomber, MobileNo: cmobileno, CreateDate: new Date(), Delete: 0, Active: 1 }]
                });
            }).catch(err => {
                console.log('Error :' + err);
            });
        } else {
            res.json({
                status: true,
                msg: 'User find successfully',
                customer: customer
            });
        }
    }).catch(err => {
        console.log('Error ' + err);
    });

    // if (!customer.length) {
    //     const [customer, created] = Customer.findOrCreate({
    //         where: { MobileNo: cmobileno },
    //         defaults: { CID: cid, TONumber: toNomber, MobileNo: cmobileno, CreateDate: new Date(), Delete: 0, Active: 1 }
    //     });
    //     res.json({
    //         status: true,
    //         msg: 'User Create successfully',
    //         customer: [{ CID: cid, TONumber: toNomber, MobileNo: cmobileno, CreateDate: new Date(), Delete: 0, Active: 1 }]
    //     });
    // }
    // res.json({
    //     status: true,
    //     msg: 'User Create successfully',
    //     customer: [{ CID: cid, TONumber: toNomber, MobileNo: cmobileno, CreateDate: new Date(), Delete: 0, Active: 1 }]
    // });


    // const [customer, created] = Customer.findOrCreate({
    //     where: { MobileNo: cmobileno },
    //     defaults: { CID: cid, TONumber: toNomber, MobileNo: cmobileno, CreateDate: new Date(), Delete: 0, Active: 1 }
    // }).then(customer => {
    //     res.json({
    //         status: true,
    //         msg: 'User Create successfully',
    //         customer: [{ CID: cid, TONumber: toNomber, MobileNo: cmobileno, CreateDate: new Date(), Delete: 0, Active: 1 }]
    //     });
    // }).catch(err => {
    //     console.log('Error ' + err);
    // });
    // Customer.findAll({ where: { MobileNo: cmobileno }, limit: 1 }).then(customer => {
    //     res.json(customer);
    // }).catch(err => {
    //     console.log('Error ' + err);
    // });
    //res.json(customer);




    // if (created) {
    //     console.log('Some thing ' + customer.Id); // This will certainly be 'Technical Lead JavaScript'
    // }
    // Customer.findAll({ where: { MobileNo: cmobileno }, limit: 1 }).then(customer => {
    //     res.json(customer);
    // }).catch(err => {
    //     console.log('Error ' + err);
    // });
    // console.log('CID ' + customer.CID); // 'sdepold'
    // console.log('Mobile ' + customer.MobileNo); // This may or may not be 'Technical Lead JavaScript'
    // console.log(created); // The boolean indicating whether this instance was just created
    // if (created) {
    //     console.log(customer.Id); // This will certainly be 'Technical Lead JavaScript'
    // }
    //var customerid = req.body.customerid; for x-www-urlencoded 
    // var cmobileno = req.query.cmobileno;
    // console.log(cmobileno);

});
router.post('/updatecustomer', (req, res, next) => {
    if (!req.body) {
        res.status(400);
        res.json({ error: 'Bad data request' + req.body });
    } else {
        Customer.create(req.body).then(data => {
            res.json({
                status: true,
                msg: 'Add to cart successfully'
            });
        }).catch(err => {
            console.log('Error :' + err);
        });
    }
});

router.get('/getorders', (req, res, next) => {
    //var customerid = ''; //req.body.customerid; for x-www-urlencoded 
    var customerid = req.query.customerid;
    console.log(customerid);

    order.findAll({ where: { CustomerId: customerid } }).then(order => {
        res.json(order);
    }).catch(err => {
        console.log('Error ' + err);
    });
});
router.get('/getorder', (req, res, next) => {
    //var customerid = ''; //req.body.customerid; for x-www-urlencoded 
    var TOnumber = req.query.TONumber;
    //console.log(cmobileno);
    order.findAll({ where: { TONumber: TOnumber }, limit: 1 }).then(order => {
        res.json({
            status: true,
            msg: 'Order find successfully',
            order
        });
    }).catch(err => {
        console.log('Error ' + err);
    });
});

router.get('/getorderdetails', (req, res, next) => {
    var TOnumber = req.query.TONumber;
    //console.log(TOnumber);
    OrderDetails.findAll({ where: { TONumber: TOnumber } }).then(order => {
        res.json({
            "status": true,
            "msg": "Order find successfully",
            OrderDetails: order
        });
    }).catch(err => {
        console.log('Error ' + err);
    });
});

router.post('/setorder', (req, res, next) => {
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
        console.log(req.body.OrderDetails.length + ' Product Total')
        req.body.OrderDetails.forEach(product => {
            OrderDetails.create(product).then(product => {});
        });
        res.json({
            status: true,
            msg: 'Order submitted successfully'
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