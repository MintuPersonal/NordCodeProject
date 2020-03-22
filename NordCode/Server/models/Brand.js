const db = require('../database/db.js');

const home = db.sequelize.define('Ecom_Brand', {
    Id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    PID: db.Sequelize.INTEGER,
    Brand: db.Sequelize.STRING,
    Brand_BN: db.Sequelize.STRING,

    TrackedId: db.Sequelize.STRING,
    CreateBy: db.Sequelize.STRING,
    CreateDate: db.Sequelize.DATE,
    Delete: db.Sequelize.BOOLEAN,
    Active: db.Sequelize.BOOLEAN,
});
db.sequelize.sync({ force: true });
module.exports = home;