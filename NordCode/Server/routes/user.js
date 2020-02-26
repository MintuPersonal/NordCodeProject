const express = require('express');
const user = require('../models/User.js');

const router = express.Router();
router.get('/getuser', (req, res, next) => {
    user.findAll().then( users => {
        res.json(users);
    }).catch(err => {
        res.send('Error :' + err);
    })
})

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