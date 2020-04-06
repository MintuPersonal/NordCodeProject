const db = require('../database/db.js');

const OrderDetails = db.sequelize.define('Ecom_OrderDetails', {
    Id: { type: db.Sequelize.INTEGER, primaryKey: true, autoIncrement: true, },
    OrderId: db.Sequelize.INTEGER,
    ProductId: db.Sequelize.INTEGER,
    TONumber: db.Sequelize.STRING,
    PName: db.Sequelize.STRING,
    PQty: db.Sequelize.INTEGER,
    ItemQty: db.Sequelize.INTEGER,
    UnitPrice: db.Sequelize.INTEGER,
    NetPrice: db.Sequelize.INTEGER,
    HostAddress: db.Sequelize.STRING,
    ImgPath: db.Sequelize.STRING,

    TrackedId: db.Sequelize.STRING,
    CreateBy: db.Sequelize.STRING,
    CreateDate: db.Sequelize.DATE,
    UpdateBy: db.Sequelize.STRING,
    UpdateDate: db.Sequelize.DATE,
    Delete: db.Sequelize.BOOLEAN,
    Active: db.Sequelize.BOOLEAN,
});

db.sequelize.sync({ force: true });
module.exports = OrderDetails;