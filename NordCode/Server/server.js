
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "NordCode"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

});

app.listen(PORT, function () {
    console.log('Server running on localhost port :' + PORT);
})




app.get('/api/getuser', function (req, res) {
    var sql = "SELECT * FROM users WHERE 1";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.status(200).send(result);
    });
});

app.post('/api/createuser', function (req, res) {

    var sql = "INSERT INTO users (user, pass, isDelete, isActive) VALUES ('" + req.body.UserName + "', '" + req.body.PassWord + "','0','1')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.status(200).send({ 'id': 1, 'message': 'Data Save Successfully' });
    });

})



app.get('/api/gettask', function(req, res){

    var sql = "SELECT * FROM tasks Where 1";
    con.query(sql, function(err, result){
        if(err) throw err;
        res.status(200).send(result);
    })
})

app.post('/api/createtask', function (req, res) {

    exportTimeFrom = JSON.stringify(req.body.From);
    exportTimeTo = JSON.stringify(req.body.To);


    var sql = "INSERT INTO tasks (title, description, date, time_from, time_to, location, notify, email, priority, isDelete, isDone, users_user_id)" +
        "VALUES ('" + req.body.Title + "','" + req.body.Description
        + "','" + req.body.Date + "','" + exportTimeFrom + "','" + exportTimeTo + "','" + req.body.Location
        + "','" + req.body.Notify + "','" + req.body.Email + "','" + req.body.Priority + "','" + req.body.IsDelete + "','" + req.body.IsDone + "', '1')";

    con.query(sql, function (err, result) {
        if (err) throw err;
        res.status(200).send({ 'id': 1, 'message': 'Data Save Successfully' });
    });

})



///// UserSignUp  /////

app.post('/api/signup', function (req, res) {

    exportTimeFrom = JSON.stringify(req.body.From);
    exportTimeTo = JSON.stringify(req.body.To);


    var signUpSql = "INSERT INTO user_Information (user, pass, isDelete, fileUrl, fileExtention, fileImage, birthday, trackedId, isActive) VALUES ('" + req.body.UserName + "', '" + req.body.PassWord
        + "','0','" + req.body.FileUrl + "', '" + req.body.FileExtention + "', '" + req.body.FileImage + "', '" + req.body.Birthday + "', '" + req.body.TrackedId + "', '1')";
    debugger;
    con.query(signUpSql, function (err, result) {

        if (err) throw err;
        res.status(200).send({ 'id': 1, 'message :': req.body });
    })

})

//////End Of UserSignUp///////