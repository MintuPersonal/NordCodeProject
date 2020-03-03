const Sequelize = require('sequelize');
const express = require('express');
//express.use(bodyParser.json());
// var env = process.env.NODE_ENV || 'development';
// var config = require(__dirname + '/../config/config.json')[env];
const db = {};
const sequelize = new Sequelize('ERP', 'sa', 'Oneict@123', {
    host: '10.11.4.153', dialect: 'mssql', operatorsAliases: 0, 
    define: {
        timestamps: false
    }    
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Express = express;

module.exports = db;