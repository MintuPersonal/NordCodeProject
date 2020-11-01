var CustomerModel = require('../../models/admin/CustomerModel.js');



async function CustomerList(req, res) {  

   
    var data={};
        var promise = CustomerModel.select_query("select * from Ecom_Customers");  
        promise.then(function(data){           

         //  var t= data.filter(s=>s.gid==2);
          // console.log(JSON.stringify(t));

             
            res.set('content-type' , 'text/html; charset=mycharset'); 
            res.render('Admin/Customer/CustomerList.ejs', {title: '24Bigbazar.com | User', content: 'Customer Information', data: data.recordset, action:"CustomerList", controller:'Customer'});
           
            }).catch(function(err){
                console.log(err);
                res.status(500).send({ error: err });
                //res.render('Admin/Basic/BasicList.ejs', {title: '24Bigbazar.com | Basic', content: 'Basic Information', data: data});
        
            });    
    
     
};  
exports.CustomerList = CustomerList;




async function CustomerEntry(req, res) {  

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
                 var promise = CustomerModel.select_query("select * from Ecom_Roles");  
                    promise.then(function(data){       
                    res.set('content-type' , 'text/html; charset=mycharset'); 
                    res.render('Admin/Customer/CustomerEntry.ejs', {title: '24Bigbazar.com | User Entry', content: 'User Information', data: data.recordset,  action:"UserEntry", controller:'User'});
                
                    })     
                }else{  
           
           var sqlquery="insert into ecom_Users(name, username,Phone, Email, password, roleid) values('"+input.Name+"', '"+input.Username+"','"+input.Phone+"','"+input.Email+"','"+input.Password+"',"+input.roleid+")";
           console.log(sqlquery);
           CustomerModel.insert(sqlquery);  
           
           res.redirect('/Admin/Customer/CustomerList');
        
    }
      

   }else{
    var promise = CustomerModel.select_query("select * from Ecom_Roles");  
    promise.then(function(data){       
       res.set('content-type' , 'text/html; charset=mycharset'); 
       res.render('Admin/Customer/CustomerEntry.ejs', {title: '24Bigbazar.com | User Entry', content: 'User Information', data: data.recordset,  action:"UserEntry", controller:'User'});
   
    }).catch(function(err){
    res.status(500).send({ error: err });
    });    
      
   }   
};  
exports.CustomerEntry = CustomerEntry;




async function CustomerEdit(req, res) {  

   // console.log('test');
    const { check, validationResult } = require('express-validator/check');   
    var input = JSON.parse(JSON.stringify(req.body)); 
   
        errorData = {};
        data={};
       if (req.method == "POST") { 
          
        req.checkBody('Name', 'Name is required').notEmpty();
        req.checkBody('MobileNo', 'User ID is required').notEmpty();      
       
      
        req.checkBody('Area', 'Area is required').notEmpty();
        req.checkBody('Address', 'Email is required').notEmpty();
        req.checkBody('Email', 'Password is required').notEmpty();
       
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
                var sqlquery="select * from Ecom_Customers where Id="+req.params.id;
            //  console.log(sqlquery);
            var promise = CustomerModel.select_query(sqlquery);  
            promise.then(function(data){       
            res.set('content-type' , 'text/html; charset=mycharset'); 
            res.render('Admin/Customer/CustomerEdit.ejs', {title: '24Bigbazar.com | Customer Edit', content: 'Customer Information', data: data.recordsets,  action:"SupplierEdit", controller:'Supplier'});
        
            })     
         }else{  
           
            var sqlquery="update Ecom_Customers set name='"+input.Name+"', MobileNo='"+input.MobileNo+"',Area='"+input.Area+"', Email='"+input.Email+"', Address='"+input.Address+"' where Id="+req.params.id;
            // console.log(sqlquery);
          CustomerModel.insert(sqlquery);  
           
           res.redirect('/Admin/Customer/CustomerList');
        
    }
      

   }else{
    var sqlquery="select * from Ecom_Customers where Id="+req.params.id;
    
    var promise = CustomerModel.select_query(sqlquery);  
    promise.then(function(data){   
           // console.log(data);
       res.set('content-type' , 'text/html; charset=mycharset'); 
       res.render('Admin/Customer/CustomerEdit.ejs', {title: '24Bigbazar.com | Customer Edit', content: 'Customer Information', data: data.recordset,  action:"CustomerList", controller:'Customer'});
   
    }).catch(function(err){
    res.status(500).send({ error: err });
    });    
      
   }   
};  
exports.CustomerEdit = CustomerEdit;