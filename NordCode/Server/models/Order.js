const db = require('../database/db.js');

const Order = db.sequelize.define('Ecom_Order', {
    Id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    OID: db.Sequelize.INTEGER,
    TONumber: db.Sequelize.STRING,
    CustomerId: db.Sequelize.INTEGER,
    PaymentId: db.Sequelize.INTEGER,
    CouponId: db.Sequelize.INTEGER,
    Discount: db.Sequelize.INTEGER,
    Reason: db.Sequelize.STRING,

    TotalItemQty: db.Sequelize.INTEGER,
    TotalPrice: db.Sequelize.INTEGER,
    DeliveryCharge: db.Sequelize.INTEGER,
    NetPrice: db.Sequelize.INTEGER,
    DeliveryTime: db.Sequelize.STRING,
    Address: db.Sequelize.STRING,
    Aria: db.Sequelize.STRING,
    OrderStatus: db.Sequelize.INTEGER,

    TrackedId: db.Sequelize.STRING,
    CreateBy: db.Sequelize.STRING,
    CreateDate: db.Sequelize.DATE,
    Delete: db.Sequelize.BOOLEAN,
    Active: db.Sequelize.BOOLEAN,
});
//Order.hasMany(OrderDetails);
//Order.hasMany(OrderDetails);
// const OrderDetails = db.sequelize.define('Ecom_OrderDetails', {
//     Id: { type: db.Sequelize.INTEGER, primaryKey: true, autoIncrement: true, },
//     OrderId: db.Sequelize.INTEGER,
//     ProductId: db.Sequelize.INTEGER,
//     TONumber: db.Sequelize.STRING,
//     PName: db.Sequelize.STRING,
//     PQty: db.Sequelize.INTEGER,
//     ItemQty: db.Sequelize.INTEGER,
//     UnitPrice: db.Sequelize.INTEGER,
//     NetPrice: db.Sequelize.INTEGER,
//     HostAddress: db.Sequelize.STRING,
//     ImgPath: db.Sequelize.STRING,

//     TrackedId: db.Sequelize.STRING,
//     CreateBy: db.Sequelize.STRING,
//     CreateDate: db.Sequelize.DATE,
//     UpdateBy: db.Sequelize.STRING,
//     UpdateDate: db.Sequelize.DATE,
//     Delete: db.Sequelize.BOOLEAN,
//     Active: db.Sequelize.BOOLEAN,
// });

//OrderDetails.belongsTo(Order, { as: 'Order', foreignKey: 'OrderId' });
db.sequelize.sync({ force: true }); //{ force: true }

// .then(() => {
//     product.create();
// }).catch(err => {
//     console.log('Error : ' + err);
// });

module.exports = Order;