const db = require('../database/db.js');
const tasks = db.sequelize.define(
    'user_tasks', {
    task_id: db.Sequelize.BIGINT,
    title: db.Sequelize.STRING,
    description: db.Sequelize.TEXT,
    date: db.Sequelize.DATE,
    time_from: db.Sequelize.STRING,
    time_to: db.Sequelize.STRING,
    location: db.Sequelize.TEXT,
    notify: db.Sequelize.INTEGER,
    email: db.Sequelize.TEXT,
    priority: db.Sequelize.INTEGER,
    isDelete: db.Sequelize.BOOLEAN,
    isDone: db.Sequelize.BOOLEAN,
    user_Information_user_id: db.Sequelize.INTEGER,
    create_at: db.Sequelize.DATE
});

db.sequelize.sync({ force: true })
    .then(() => {
        tasks.create(
            {
                task_id: 1,
                title: 'db.Sequelize.STRING',
                description: 'db.Sequelize.TEXT',
                date: new Date().toLocaleDateString(),
                time_from: new Date().toLocaleDateString(),
                time_to: new Date().toLocaleDateString(),
                location: 'Rajshahi-6210',
                notify: 50,
                email: 'db@gmail.com',
                priority: 10,
                isDelete: false,
                isDone: false,
                user_Information_user_id: 1,
                create_at: new Date().toLocaleDateString()
            });
    }).catch(err => {
        console.log('Error :' + err);
    });

module.exports = tasks