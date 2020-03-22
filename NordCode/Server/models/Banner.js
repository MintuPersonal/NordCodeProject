const db = require('../database/db.js');

const home = db.sequelize.define('Ecom_Banner', {
    Id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    PID: db.Sequelize.INTEGER,
    ImgPath: db.Sequelize.STRING,

    TrackedId: db.Sequelize.STRING,
    CreateBy: db.Sequelize.STRING,
    CreateDate: db.Sequelize.DATE,
    Delete: db.Sequelize.BOOLEAN,
    Active: db.Sequelize.BOOLEAN,
});

db.sequelize.sync({ force: true });
module.exports = home;

// PName: db.Sequelize.STRING,
// PName_BN: db.Sequelize.STRING,
// Brand: db.Sequelize.STRING,
// Brand_BN: db.Sequelize.STRING,