const db = require('../database/db.js');

const home = db.sequelize.define('Ecom_Products', {
    PID: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Brand: db.Sequelize.STRING,
    Brand_BN: db.Sequelize.STRING,
    //Img_path: db.Sequelize.STRING
});

module.exports = home;