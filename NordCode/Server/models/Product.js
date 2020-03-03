const db = require('../database/db.js');

const product = db.sequelize.define(
    'Ecom_Products', {
    PID: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    PName: db.Sequelize.STRING,
    PName_BN: db.Sequelize.STRING,
    Brand: db.Sequelize.STRING,
    Brand_BN: db.Sequelize.STRING,
    UnitPrice: db.Sequelize.FLOAT,
    Unit: db.Sequelize.FLOAT,
    UnitInStock: db.Sequelize.BIGINT,
    Category: db.Sequelize.STRING,
    Category_BN: db.Sequelize.STRING,
    Description: db.Sequelize.STRING,
    Description_BN: db.Sequelize.STRING,
    SID: db.Sequelize.BIGINT,
    Role: db.Sequelize.STRING,
    ParentId: db.Sequelize.BIGINT,
    Img_Path: db.Sequelize.STRING,
    Inserted_By: db.Sequelize.STRING,
    Inserted_Date: db.Sequelize.DATE
});

db.sequelize.sync({ force: true });
    
// .then(() => {
    //     product.create();
    // }).catch(err => {
    //     console.log('Error : ' + err);
    // });

module.exports = product;