var UserModel = require('../../models/admin/UserModel.js');


async function Login(req, res) {  

    const { check, validationResult } = require('express-validator/check');   
    var input = JSON.parse(JSON.stringify(req.body)); 
   
        errorData = {};
        data={};
       if (req.method == "POST") { 
          
       
       req.checkBody('Email', 'Email is required').notEmpty();
       req.checkBody('Password', 'Password is required').notEmpty();      
         
       var errors = req.validationErrors();   
      
        if(errors){	  
            if(errors.length > 0){
                errors.forEach(function (errors1) {
                    var field1 = String(errors1.param); 
                    var msg = errors1.msg; 
                    errorData[field1] = msg;     
                });
            }  
           // data.email = input.email; 
           // data.password = input.password; 
            res.set('content-type' , 'text/html; charset=mycharset'); 
            res.render('Admin/Auth/login.ejs',{page_title:"Admin - Login",data:data,errorData:errorData});   
        }else{  
            var email         = input.Email;   
           

            var password      = input.Password;  
            var promise = UserModel.select(email,password);  
            promise.then(function(data){           

           // res.set('content-type' , 'text/html; charset=mycharset'); 
          console.log(JSON.stringify(data));
          if(data.recordset.length>0){
             req.session.LoginUser = JSON.stringify(data.recordset);  

           
           res.redirect('/Admin/Index');
          }
          else
          {
            res.set('content-type' , 'text/html; charset=mycharset'); 
            res.render('Admin/Auth/login.ejs',{page_title:"Admin - Login",data:data.recordset,errorData:errorData});   
  
          }
      }).catch(function(err){
           res.status(500).send({ error: err+"test" });
      });    
    }
      


   }else{
       res.set('content-type' , 'text/html; charset=mycharset'); 
       res.render('Admin/Auth/login.ejs', {title: '24Bigbazar.com | Login', content: 'Create by Tuan Anh Zippy <mmm@gmail.com>', data: data});
   
   }   
};  
exports.Login = Login;


async function logout(req, res) {  
      
   // res.set('contennt-type' , 'text/html; charset=mycharset'); 
  /*  data = {}; LoginUser = {}; errorData = {};
    if(req.session){
        req.session.destroy(function (err) {
            //res.redirect('/'); //Inside a callback… bulletproof!
            res.redirect('/Admin/login');  
        });  
   }   */
    res.redirect('/');     
};  
exports.logout = logout;
