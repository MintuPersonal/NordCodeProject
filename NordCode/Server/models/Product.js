const db = require('../database/db.js');

const product = db.sequelize.define('Ecom_Products', {
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
    UnitsInStock: db.Sequelize.BIGINT,
    Category: db.Sequelize.STRING,
    Category_BN: db.Sequelize.STRING,
    Description: db.Sequelize.STRING,
    Description_BN: db.Sequelize.STRING,
    SID: db.Sequelize.BIGINT,
    Rol: db.Sequelize.STRING,
    ParentId: db.Sequelize.BIGINT,
    ImgPath: db.Sequelize.STRING,
    Inserted_By: db.Sequelize.STRING,
    Inserted_Date: db.Sequelize.DATE,

    Display: db.Sequelize.STRING,
    FileUrl: db.Sequelize.STRING,
    FileExtension: db.Sequelize.STRING,
    FileImage: db.Sequelize.STRING,
    TrackedId: db.Sequelize.STRING,
    Active: db.Sequelize.STRING,
});

db.sequelize.sync({ force: true })
    .then(() => {
        product.create({
            PID: 0,
            PName: 'Apple',
            PName_BN: 'Apple',
            Brand: 'Apple',
            Brand_BN: 'Apple',
            UnitPrice: 250,
            Unit: 500,
            UnitsInStock: 50,
            Category: 'Apple',
            Category_BN: 'Apple',
            Description: 'Apple',
            Description_BN: 'Apple',
            SID: 1,
            Rol: 1,
            ParentId: 1,
            ImgPath: 'image/product/Apple.jpg',
            Inserted_By: 11,
            Inserted_Date: new Date().toLocaleDateString(),

            Display: 1,
            FileUrl: 'image/product/Apple.jpg',
            FileExtension: '.jpg',
            FileImage: 'image/product/Apple.jpg',
            TrackedId: '127',
            Active: 1,
        });
    }).catch(err => {
        console.log('Error : ' + err);
    });

module.exports = product;