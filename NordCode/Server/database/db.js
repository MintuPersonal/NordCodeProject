const Sequelize = require('sequelize');
const express = require('express');
//var bodyParser = require('body-parser');
//express.use(bodyParser.urlencoded({ extended: true }));
//express.use(bodyParser.json());

// var   = process.env.NODE_ENV || 'development';
// var config = require(__dirname + '/../config/config.json')[env];

const db = {};
const sequelize = new Sequelize(process.env.db_name, process.env.db_user, process.env.db_password, {
    host: process.env.db_host,
    dialect: process.env.db_dialect,
    operatorsAliases: 0,
    define: { timestamps: false }
});

//const sequelize = new Sequelize('postgres://postgres:1qaz@127.0.0.1:5432/ERP', { dialect: 'postgres' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Express = express;
module.exports = db;