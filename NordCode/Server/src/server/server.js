require('dotenv').config({ encoding: 'latin1' });
const config = require('../database/config/config.json')
const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const auth = require('../auth/auth.js');
const home = require('../routes/home.js');
const product = require('../routes/product.js');
const order = require('../routes/order.js');

const task = require('../routes/task.js');
const customer = require('../routes/customer.js');
const menu = require('../routes/menu.js');
const setting = require('../routes/setting.js');
// const user = require('../Server/routes/user.js');
// const login = require('../Server/routes/login.js');
// const article = require('../Server/routes/article.js');

const PORT = process.env.PORT || 3443;
const port = process.env.PORT || 3000;
const directoryToServe = 'client';
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/htts_home', express.static(path.join(__dirname, '..', directoryToServe)));
app.use('/api', auth, home, product, order, task, customer, menu, setting);

const httpsOptions = {
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'certificate.pem')),
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'privatekey.pem'))
}

https.createServer(httpsOptions, app)
    .listen(PORT, () => {
        console.log(`Server the ${directoryToServe}/ directory at https:/localhost/${PORT}`);
    });

app.listen(port, () => {
    //console.log(config.production.host)
    var url = path.join(__dirname, 'assets');
    console.log('Server running on :' + port + ' Dir ' + url);
});




















// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "nordCode"
// });

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");

// });


// app.get('/api/gettask', function (req, res) {

//     var sql = "SELECT * FROM user_tasks Where 1";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         res.status(200).send(result);
//     })
// })

// app.post('/api/createtask', function (req, res) {
//     console.log(req.body);
//     exportTimeFrom = JSON.stringify(req.body.From);
//     exportTimeTo = JSON.stringify(req.body.To);

//     var sql = "INSERT INTO user_tasks (title, description, date, time_from, time_to, location, notify, email, priority, isDelete, isDone, user_Information_user_id)" +
//         "VALUES ('" + req.body.Title + "','" + req.body.Description
//         + "','" + req.body.Date + "','" + exportTimeFrom + "','" + exportTimeTo + "','" + req.body.Location
//         + "','" + req.body.Notify + "','" + req.body.Email + "','" + req.body.Priority + "','" + req.body.IsDelete + "','" + req.body.IsDone + "', '1')";

//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         res.status(200).send({ 'id': 1, 'message': 'Data Save Successfully' });
//     });
// });

// ///// UserSignUp  /////

// app.post('/api/signup', function (req, res) {

//     exportTimeFrom = JSON.stringify(req.body.From);
//     exportTimeTo = JSON.stringify(req.body.To);


//     var signUpSql = "INSERT INTO user_Information (user, pass, isDelete, fileUrl, fileExtention, fileImage, birthday, trackedId, isActive) VALUES ('" + req.body.UserName + "', '" + req.body.PassWord
//         + "','0','" + req.body.FileUrl + "', '" + req.body.FileExtention + "', '" + req.body.FileImage + "', '" + req.body.Birthday + "', '" + req.body.TrackedId + "', '1')";
//     debugger;
//     con.query(signUpSql, function (err, result) {

//         if (err) throw err;
//         res.status(200).send({ 'id': 1, 'message :': req.body });
//     })
// });

//////End Of UserSignUp///////

/////////// ORM MYSQL ////////////

// app.get('/api/article', (req, res) => {
//     console.log(req.body);
//     //var data = ormArticle.ormArticleSeed(req.body);   
//     res.status(200).send(200); 
// });

// const orm = require('./database/article.js')

// app.get('/api/getartcle', (req, res)=>{
//     var data = orm.getArticles();
//     console.log(data);
//     res.status(200).send(data);
// });

/////////// END ORM MYSQL ////////////s