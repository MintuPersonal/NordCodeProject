
var sequelize = require('sequelize');

module.exports.ormArticleSeed = (req, res) => {

    var connection = new sequelize('nordcode', 'root', '', {
        host: 'localhost',
        dialect: 'mysql' /* | 'mariadb' | 'postgres' | 'mssql' */
    });

    var artcle = connection.define('user_artcle', {
        //id: sequelize.BIGINT,
        title: sequelize.TEXT,
        body: sequelize.TEXT
    });

    connection.sync({ force: true })
        .then(() => {
            console.log('res.UserName');
            artcle.create({
                //Id: 1,
                title: 'res UserName',
                body: 'Test Body'
            });
        })
        .then(() => {
            artcle.findAll().then((artcles) => {
                console.log(artcles.length);
            })
        });
}