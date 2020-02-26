const db = require('../database/db.js');
const user = db.sequelize.define(
    'user_informations', {
    user_id: db.Sequelize.INTEGER,
    user: db.Sequelize.STRING,
    pass: db.Sequelize.STRING,
    isDelete: db.Sequelize.BOOLEAN,
    isActive: db.Sequelize.BOOLEAN,
    fileUrl: db.Sequelize.STRING,
    fileExtention: db.Sequelize.STRING,
    fileImage: db.Sequelize.STRING,
    birthday: db.Sequelize.DATE,
    trackedId: db.Sequelize.STRING,
    create_at: db.Sequelize.DATE
});

db.sequelize.sync({ force: true })
    .then(() => {
        user.create({
            user_id: 1,
            user: 'Mintu',
            pass: '123456',
            isDelete: false,
            isActive: true,
            fileUrl: 'db.Sequelize.STRING',
            fileExtention: '.png',
            fileImage: 'db.Sequelize.STRING',
            birthday: new Date().toLocaleDateString(),
            trackedId: 'lenovopc',
            created_at: new Date().toLocaleDateString()
        })
    }).catch(err => {
        console.log('Error : ' + err);
    })

module.exports = user;