
const db = require('../database/db.js');

const offer = db.sequelize.define('Ecom_Offers', {
    CId: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    CName: db.Sequelize.STRING,
    CName_BN: db.Sequelize.STRING,    
    CouponNo: db.Sequelize.STRING,
    ValidFrom: db.Sequelize.DATE,
    ValidTo: db.Sequelize.DATE,
    ValidCountry: db.Sequelize.STRING,
    ValidOutletName: db.Sequelize.STRING,
    DiscountPrice: db.Sequelize.INTEGER,
    Percent: db.Sequelize.BOOLEAN,
    Reason: db.Sequelize.STRING,
    Active: db.Sequelize.BOOLEAN
});

module.exports = offer;