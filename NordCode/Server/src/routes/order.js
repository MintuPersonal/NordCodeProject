const db = require('../database/db.js');
const coupon = require('../models/Coupon.js');
const Order = require('../models/Order.js');

const router = db.Express.Router();
router.get('/setcoupon', (req, res, next) => {
    var couponNo = req.body.CouponNo;
    coupon.findAll({ where: { CouponNo: couponNo } }).then(offers => {
        res.json(offers);
    }).catch(err => {
        console.log('Error ' + err);
    });
});

router.post('/updateorder', (req, res, next) => {
    console.log('Order Updated ' + req.body.Address + ' Area :' + req.body.Area);
    if (!req.body) {
        res.status(400);
        res.json({ error: 'Bad data request' + req.body });
    } else {
        Order.update({
            Area: req.body.Area,
            Address: req.body.Address
        }, {
            where: {
                TONumber: req.body.TONumber
            }
        }).then(function() {
            res.status(200);
        });
        res.status(200);
    }
});

module.exports = router;