const Sequelize = require('sequelize');
const express = require('express');
//express.use(bodyParser.json());
// var env = process.env.NODE_ENV || 'development';
// var config = require(__dirname + '/../config/config.json')[env];
const db = {};
const sequelize = new Sequelize('nordcode', 'root', '', {
    host: 'localhost', dialect: 'mysql', operatorsAliases: 0 //false
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Express = express;

module.exports = db;