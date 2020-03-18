const db = require('../database/db.js');

const customer = db.sequelize.define('Ecom_Customers', {
    TOId: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    CID: db.Sequelize.INTEGER,
    PID: db.Sequelize.INTEGER,
    TONumber: db.Sequelize.STRING,
    PName: db.Sequelize.STRING,
    HostAddress: db.Sequelize.STRING,
    UnitPrice: db.Sequelize.INTEGER,
    NetPrice: db.Sequelize.INTEGER,
});

module.exports = customer;