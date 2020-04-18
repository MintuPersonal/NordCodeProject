// const db = require('../database/db.js');
// //const { QueryTypes } = require('sequelize');
// //const ProductIamges = db.sequelize.query("Select image from Ecom_ProductIamges Where PID = 59 And default_image=0", { type: QueryTypes.SELECT });
// const ProductIamges = db.sequelize.define('Ecom_ProductIamges', {
//     Id: {
//         type: db.Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     PID: db.Sequelize.INTEGER,
//     Iamge: db.Sequelize.STRING,
//     Default_Image: db.Sequelize.STRING
// });
// module.exports = ProductIamges;