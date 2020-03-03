const db = require('../database/db.js');

const home = db.sequelize.define('Ecom_Products', {
    PId: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },   
    // PName: db.Sequelize.STRING,
    // PName_BN: db.Sequelize.STRING,
    // Brand: db.Sequelize.STRING,
    // Brand_BN: db.Sequelize.STRING,
    Img_path: db.Sequelize.STRING
});

module.exports = home;