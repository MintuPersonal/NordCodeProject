const db = require('../database/db.js');
const coupon = require('../models/Coupon.js');



const router = db.Express.Router();
router.get('/setcoupon', (req, res, next) => {
    var couponNo = req.body.CouponNo;
    coupon.findAll({ where: { CouponNo: couponNo } }).then(offers => {
        res.json(offers);
    }).catch(err => {
        console.log('Error ' + err);
    });
});
// router.get('/getorder', (req, res, next) => {
//     var orderNo = req.query.OrderNo;
//     console.log(orderNo);
//     order.findAll({ where: { OrderNo: orderNo } }).then(orders => {
//         res.json(orders);
//     }).catch(err => {
//         console.log('Error ' + err);
//     });
// });


module.exports = router;