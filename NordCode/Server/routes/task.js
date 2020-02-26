const db = require('../database/db.js');
const task = require('../models/Task.js');

const router = db.Express.Router();
router.get('/gettask', (req, res, next) => {
    task.findAll().then(tasks => {
        res.json(tasks);
    }).catch(err => { res.send('Error :' + err) });
});
router.post('/createtask', (req, res, next) => {    
    console.log(req.body);
    if (!req.body) {
        res.status(400);
        res.json({ error: 'Bad data request' + req.body });
    }
    else {
        task.create(req.body)
            .then(data => {
                res.send(data);
            }).catch(err => {
                console.log('Error :' + err);
            });
    }
});
module.exports = router;


