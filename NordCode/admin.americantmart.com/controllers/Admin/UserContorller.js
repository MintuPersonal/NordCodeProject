var UserModel = require('../../models/admin/UserModel.js');



async function UserList(req, res) {  

   
    var data={};
        var promise = UserModel.select_query("select * from Ecom_Users; select * from Ecom_Roles;");  
        promise.then(function(data){           

         //  var t= data.filter(s=>s.gid==2);
          // console.log(JSON.stringify(t));

             
            res.set('content-type' , 'text/html; charset=mycharset'); 
            res.render('Admin/User/UserList.ejs', {title: '24Bigbazar.com | User', content: 'User Information', data: data.recordsets, action:"UserList", controller:'User'});
           
            }).catch(function(err){
                console.log(err);
                res.status(500).send({ error: err });
                //res.render('Admin/Basic/BasicList.ejs', {title: '24Bigbazar.com | Basic', content: 'Basic Information', data: data});
        
            });    
    
     
};  
exports.UserList = UserList;




async function UserEntry(req, res) {  

    const { check, validationResult } = require('express-validator/check');   
    var input = JSON.parse(JSON.stringify(req.body)); 
   
        errorData = {};
        data={};
       if (req.method == "POST") { 
          
       // console.log(req.body);
       req.checkBody('Name', 'Name is required').notEmpty();
       req.checkBody('Username', 'User ID is required').notEmpty();      
      // req.checkBody('Phone', 'Phone is required').notEmpty();
       req.checkBody('Email', 'Email is required').notEmpty();
       req.checkBody('roleid', 'Role is required').notEmpty();
       req.checkBody('Password', 'Password is required').notEmpty();
       req.checkBody('CPassword', 'Password is required').notEmpty();
       req.assert('CPassword', 'Password do not match').equals(req.body.Password);
       var errors = req.validationErrors();    
        if(errors){	  
            if(errors.length > 0){
                errors.forEach(function (errors1) {
                    var field1 = String(errors1.param); 
                    var msg = errors1.msg; 
                    errorData[field1] = msg;     
                });
            }  
           //console.log(errors);
                 var promise = UserModel.select_query("select * from Ecom_Roles");  
                    promise.then(function(data){       
                    res.set('content-type' , 'text/html; charset=mycharset'); 
                    res.render('Admin/User/UserEntry.ejs', {title: '24Bigbazar.com | User Entry', content: 'User Information', data: data.recordset,  action:"UserEntry", controller:'User'});
                
                    })     
                }else{  
           
           var sqlquery="insert into ecom_Users(name, username,Phone, Email, password, roleid) values('"+input.Name+"', '"+input.Username+"','"+input.Phone+"','"+input.Email+"','"+input.Password+"',"+input.roleid+")";
           console.log(sqlquery);
           UserModel.insert(sqlquery);  
           
           res.redirect('/Admin/User/UserList');
        
    }
      

   }else{
    var promise = UserModel.select_query("select * from Ecom_Roles");  
    promise.then(function(data){       
       res.set('content-type' , 'text/html; charset=mycharset'); 
       res.render('Admin/User/UserEntry.ejs', {title: '24Bigbazar.com | User Entry', content: 'User Information', data: data.recordset,  action:"UserEntry", controller:'User'});
   
    }).catch(function(err){
    res.status(500).send({ error: err });
    });    
      
   }   
};  
exports.UserEntry = UserEntry;




async function UserEdit(req, res) {  

   // console.log('test');
    const { check, validationResult } = require('express-validator/check');   
    var input = JSON.parse(JSON.stringify(req.body)); 
   
        errorData = {};
        data={};
       if (req.method == "POST") { 
          
        req.checkBody('Name', 'Name is required').notEmpty();
        req.checkBody('Username', 'User ID is required').notEmpty();      
       // req.checkBody('Phone', 'Phone is required').notEmpty();
        req.checkBody('Email', 'Email is required').notEmpty();
        req.checkBody('roleid', 'Role is required').notEmpty();
        req.checkBody('Password', 'Password is required').notEmpty();
        req.checkBody('CPassword', 'Password is required').notEmpty();
        req.assert('CPassword', 'Password do not match').equals(req.body.Password);
       var errors = req.validationErrors();    
        if(errors){	  
            if(errors.length > 0){
                errors.forEach(function (errors1) {
                    var field1 = String(errors1.param); 
                    var msg = errors1.msg; 
                    errorData[field1] = msg;     
                });
            }  
          // console.log(errors);
                var sqlquery="select * from Ecom_Roles; select * from ecom_users where Id="+req.params.id;
            //  console.log(sqlquery);
            var promise = UserModel.select_query(sqlquery);  
            promise.then(function(data){       
            res.set('content-type' , 'text/html; charset=mycharset'); 
            res.render('Admin/User/UserEdit.ejs', {title: '24Bigbazar.com | Supplier Edit', content: 'Supplier Information', data: data.recordsets,  action:"SupplierEdit", controller:'Supplier'});
        
            })     
         }else{  
           
            var sqlquery="update ecom_Users set name='"+input.Name+"', username='"+input.Username+"',Phone='"+input.Phone+"', Email='"+input.Email+"', password='"+input.Password+"', roleid="+input.roleid+" where Id="+req.params.id;
            // console.log(sqlquery);
          UserModel.insert(sqlquery);  
           
           res.redirect('/Admin/user/UserList');
        
    }
      

   }else{
     var sqlquery="select * from Ecom_Roles; select * from ecom_users where Id="+req.params.id;
     //  console.log(sqlquery);
    var promise = UserModel.select_query(sqlquery);  
    promise.then(function(data){       
       res.set('content-type' , 'text/html; charset=mycharset'); 
       res.render('Admin/User/UserEdit.ejs', {title: '24Bigbazar.com | Supplier Edit', content: 'Supplier Information', data: data.recordsets,  action:"SupplierEdit", controller:'Supplier'});
   
    }).catch(function(err){
    res.status(500).send({ error: err });
    });    
      
   }   
};  
exports.UserEdit = UserEdit;