const db = require('../database/db.js');

const order = db.sequelize.define('Ecom_Order', {
    Id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    OID: db.Sequelize.INTEGER,
    OrderNo: db.Sequelize.STRING,
    CustomerId: db.Sequelize.INTEGER,
    CouponId: db.Sequelize.INTEGER,
    PaymentId: db.Sequelize.INTEGER,
    Discount: db.Sequelize.INTEGER,
    Reason: db.Sequelize.STRING,

    ProductId: db.Sequelize.INTEGER,
    TotalItem: db.Sequelize.INTEGER,
    UnitPrice: db.Sequelize.INTEGER,
    NetPrice: db.Sequelize.INTEGER,
    Address: db.Sequelize.STRING,
    Aria: db.Sequelize.STRING,
    DeliveryTime: db.Sequelize.STRING,

    TrackedId: db.Sequelize.STRING,
    CreateBy: db.Sequelize.STRING,
    CreateDate: db.Sequelize.DATE,
    Delete: db.Sequelize.BOOLEAN,
    Active: db.Sequelize.BOOLEAN,
});
db.sequelize.sync({ force: true }); //{ force: true }

// .then(() => {
//     product.create();
// }).catch(err => {
//     console.log('Error : ' + err);
// });

module.exports = order;