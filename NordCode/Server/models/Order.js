const db = require('../database/db.js');

const order = db.sequelize.define('Ecom_Orders', {
    OId: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    OrderNo: db.Sequelize.STRING,
    CustomerId: db.Sequelize.INTEGER,
    CouponId: db.Sequelize.INTEGER,
    PaymentId: db.Sequelize.INTEGER,
    Discount: db.Sequelize.INTEGER,
    Reason: db.Sequelize.STRING,
    Active: db.Sequelize.BOOLEAN,

    ProductId: db.Sequelize.INTEGER,
    UnitPrice: db.Sequelize.INTEGER,
    Qty: db.Sequelize.INTEGER,
    NetPrice: db.Sequelize.INTEGER,
    Address: db.Sequelize.STRING,
    Aria: db.Sequelize.STRING,
    DeliveryTime: db.Sequelize.STRING,
});
db.sequelize.sync({ force: true }); //{ force: true }

// .then(() => {
//     product.create();
// }).catch(err => {
//     console.log('Error : ' + err);
// });

module.exports = order;