require('dotenv').config({ encoding: 'latin1' });
const config = require('./database/config/config.json')
const express = require('express');
const path = require('path');
const cors = require('cors');

const bodyParser = require('body-parser');

const auth = require('../Server/auth/auth.js');
const user = require('../Server/routes/user.js');
const home = require('../Server/routes/home.js');
const product = require('../Server/routes/product.js');
const order = require('../Server/routes/order.js');
const cart = require('../Server/routes/cart.js');

const task = require('../Server/routes/task.js');
const customer = require('../Server/routes/customer.js');

const menu = require('../Server/routes/menu.js');
// const user = require('../Server/routes/user.js');
// const login = require('../Server/routes/login.js');
// const article = require('../Server/routes/article.js');

const PORT = process.env.PORT;
//var ip = process.env.ip
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, function() {
    //console.log(config.production.host)
    var url = path.join(__dirname, 'assets');
    console.log('Server running on' + url + PORT);
});

app.use('/api', auth, home, product, order, task, customer, menu);



















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