const db = require('../database/db.js');

const customer = db.sequelize.define('Ecom_Customers', {
    Id: { type: db.Sequelize.INTEGER, primaryKey: true, autoIncrement: true, },
    CID: { type: db.Sequelize.STRING, unique: true },
    TONumber: db.Sequelize.STRING,
    Name: db.Sequelize.STRING,
    Address: db.Sequelize.STRING,
    Aria: db.Sequelize.STRING,

    MobileNo: db.Sequelize.STRING,
    PhoneNo: db.Sequelize.STRING,
    Priority: db.Sequelize.STRING,
    HostAddress: db.Sequelize.STRING,

    TrackedId: db.Sequelize.STRING,
    CreateBy: db.Sequelize.STRING,
    CreateDate: db.Sequelize.DATE,
    UpdateBy: db.Sequelize.STRING,
    UpdateDate: db.Sequelize.DATE,
    Delete: db.Sequelize.BOOLEAN,
    Active: db.Sequelize.BOOLEAN,
});


// db.sequelize.sync({ force: true })
//     .then(() => {
//         product.create({
//             CID: '1911788888',
//             TONumber: '880',
//             Name: 'Md Karim',
//             Address: 'Houser # 11, Road# 11, Mirpur, Dhaka',
//             Aria: 'Mirpur',

//             MobileNo: '1911788888',
//             PhoneNo: '02888888',
//             Priority: 'Top',
//             HostAddress: '127.0.0.1',

//             TrackedId: '127',
//             CreateBy: '11',
//             CreateDate: new Date().toLocaleTimeSTRING(),
//             UpdateBy: '11',
//             UpdateDate: new Date().toLocaleTimeSTRING(),
//             Delete: 0,
//             Active: 1,
//         });
//     }).catch(err => {
//         console.log('Error : ' + err);
//     });

module.exports = customer;