const db = require('../config/db.js');
const user = require('../models/APImodels/User.js');

const router = db.Express.Router();

router.get('/getuser', (req, res, next) => {
    var Username = req.query.Username;
    console.log(Username);
    user.findAll({ where: { Username: Username, Password: req.query.Password } }).then(users => {
        res.json(users);
    }).catch(err => {
        res.send('Error :' + err);
    })
})

router.post('/createuser', (req, res, next) => {
    //console.log(req.body.OrderNo + ' test');
    if (!req.body) {
        res.status(400);
        res.json({ error: 'Bad data request' + req.body });
    } else {
        user.create(req.body).then(data => {
            res.json({
                status: true,
                msg: 'user submitted successfully'
            });
            // res.send(data);
        }).catch(err => {
            console.log('Error :' + err);
        });
    }
});



module.exports = router;


// app.get('/api/getuser', function (req, res) {

//     //var mgs = req.query.user;
//     //var pass = req.query.pass;

//     var sql = "SELECT * FROM user_information WHERE isActive = 1 and user = '" + req.query.user + "' and pass = '" + req.query.pass + "'";
//     console.log(sql);
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         res.status(200).send(result);
//     });
// });

// app.post('/api/createuser', function (req, res) {

//     var sql = "INSERT INTO user_LoginInformation (user, pass, isDelete, isActive, isCounted) VALUES ('" + req.body.UserName + "', '" + req.body.PassWord + "','0','1', '" + req.body.IsCounted + "')";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         res.status(200).send({ 'id': 1, 'message': 'Data Save Successfully' });
//     });
// });

// app.post('/api/updateuser', function (req, res) {

//     var sql = "UPDATE user_logininformation SET isCounted = '" + req.body.IsCounted + "' WHERE user = '" + req.body.UserName + "' and pass = '" + req.body.PassWord + "'";
//     console.log(sql);
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         res.status(200).send({ 'isCounted': req.body.isCounted, 'message': 'Data updated successfully' });
//     });

// });