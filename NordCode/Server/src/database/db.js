const Sequelize = require('sequelize');
const express = require('express');

//var bodyParser = require('body-parser');
//express.use(bodyParser.urlencoded({ extended: true }));
//express.use(bodyParser.json());

// var   = process.env.NODE_ENV || 'development';
// var config = require(__dirname + '/../config/config.json')[env];

const db = {};
const sequelize = new Sequelize('ERP', 'sa', 'Oneict@123', {
    host: '103.106.236.90',
    operatorsAliases: 0,
    define: { timestamps: false },
    dialect: 'mssql', //dialect: //process.env.db_dialect, // pick one of 'mysql','sqlite','postgres',
});


//const sequelize = new Sequelize('postgres://postgres:1qaz@127.0.0.1:5432/ERP', { dialect: 'postgres' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Express = express;
module.exports = db;
//db.sequelize.sync({ force: true });