const db = require('../database/db.js');
const coupon = require('../models/Coupon.js');
const order = require('../models/Order.js');


const router = db.Express.Router();
router.get('/setcoupon', (req, res, next) => {
    var couponNo = req.body.CouponNo;
    coupon.findAll({ where: { CouponNo: couponNo } }).then(offers => {
        res.json(offers);
    }).catch(err => {
        console.log('Error ' + err);
    });
});

router.get('/getorder', (req, res, next) => {
    var orderNo = req.query.OrderNo;
    console.log(orderNo);
    order.findAll({ where: { OrderNo: orderNo } }).then(orders => {
        res.json(orders);
    }).catch(err => {
        console.log('Error ' + err);
    });
});

router.post('/createorder', (req, res, next) => {
    //console.log(req.body.OrderNo + ' test');
    if (!req.body) {
        res.status(400);
        res.json({ error: 'Bad data request' + req.body });
    } else {
        order.create(req.body).then(data => {
            res.json({
                status: true,
                msg: 'Order submitted successfully'
            });
            // res.send(data);
        }).catch(err => {
            console.log('Error :' + err);
        });
    }
});

module.exports = router;