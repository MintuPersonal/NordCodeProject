const db = require('../database/db.js');

const home = db.sequelize.define('Ecom_Products', {
    PID: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    PName: db.Sequelize.STRING,
    PName_BN: db.Sequelize.STRING,
    Brand: db.Sequelize.STRING,
    Brand_BN: db.Sequelize.STRING,
    ImgPath: db.Sequelize.STRING,
    UnitPrice: db.Sequelize.INTEGER
});

module.exports = home;