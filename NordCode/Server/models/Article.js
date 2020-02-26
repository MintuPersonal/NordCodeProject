const db = require('../database/db.js');

const article = db.sequelize.define(
    'user_articles', {
    title: db.Sequelize.TEXT,
    body: db.Sequelize.TEXT
});

db.sequelize.sync({ force: true })
    .then(() => {
        article.create({
            title: 'db.Sequelize.STRING',
            body: 'db.Sequelize.STRING'
        });
    }).catch(err => {
        console.log('Error :' + err);
    });

module.exports = article;