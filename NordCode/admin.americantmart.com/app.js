var createError = require('http-errors');
var express = require('express');
global.app = express(); 
global.moment = require('moment');
var path = require('path');
var port = process.env.PORT || 8010; 
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var AdminRouter = require('./routes/routes.js');

const auth = require('./auth/auth.js');
const user = require('./routes/user.js');
const home = require('./routes/home.js');
const product = require('./routes/product.js');
const order = require('./routes/order.js');
const cart = require('./routes/cart.js');
const customer = require('./routes/customer.js');
const menu = require('./routes/menu.js');
const setting = require('./routes/setting.js');

//var usersRouter = require('./routes/users');
var opn = require('opn');
var app = express();
var expressValidator = require('express-validator');
var fileUpload = require('express-fileupload');
var cors = require('cors');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
global.nodeSiteUrl = 'http://admin.americantmartbd.com:8000/'
var flash = require('express-flash-messages')
app.use(flash())

global.successStatus = 200;
global.failStatus = 401; 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressValidator());
app.use(cors())
app.use(fileUpload()); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(expressSession({secret: 'D%$*&^lk32', resave: false,saveUninitialized: true}));  



app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json');
 next();
}); 

app.use(bodyParser.json());  
app.use(express.urlencoded({limit: '100mb',extended: true })); 
 

global.msconnection = require('./config/msdbcon.js');

// connection.sql.on('connect', function(err) {  
//   // If no error, then good to proceed.  
//   console.log(err);
//    console.log("Connected");  
//    connection.executeStatement("Select top 5  * from ecom_products", function(response){  
//    console.log(response);
 
// });

//});

app.listen(port,"localhost"); //10.11.4.158
app.use('/', AdminRouter); 
app.use('/api', auth, home, product, order, customer, menu,setting);
console.log('\n================================   \nServer running: http://localhost:' + port); 



//open default browser
//opn('http://10.11.4.158:'+port+"/"); 

