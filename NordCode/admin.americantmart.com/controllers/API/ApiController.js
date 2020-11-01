

var OrderModel = require('../../models/admin/OrderModel.js');



async function OrderSubmit(req, res) { 
    try {
         const { check, validationResult } = require('express-validator/check');
         var reaponseArr = '{}'; 
         var input = JSON.parse(JSON.stringify(req.body));  
        // console.log(input.OrderNo); 
         //var auth_token = req.headers.authtoken; 
         req.checkBody('OrderNo', 'OrderNo is required').notEmpty();
         req.checkBody('CustomerId', 'CustomerId is required').notEmpty(); 
         var errors = req.validationErrors();  
        //  if(!auth_token){   	 		 
        //      return res.send(JSON.stringify({ 
        //          "status": SessionExpireStatus,
        //          "message": 'Session Expired.',  
        //      }));	  		 
        //  }
         if(errors){	  		 
             return res.send(JSON.stringify({
                 "status": failStatus,
                 "message": errors[0].msg, 
             })); 	  		 
         }else{ 
            if (req.method == "POST") { 
             var respondeArray = {};
           
             var datetime = moment().format('YYYY-MM-DD h:mm:ss a');
           
            var data=input.OrderDetails;
            var discount=0;
            var total=0;
             for(var i=0; i< data.length; i++)
             {
                 discount=discount+data[i].Discount;
                 total=total+data[i].totalPrice;
                var sqlr="INSERT INTO Ecom_OrderDetails (OrderId,TONumber,PID ,PName,PQty,ItemQty,UnitPrice ,NetPrice ,ImgPath ,CreateBy ,CreateDate, [Delete],Active)"+
                " values(0,'"+input.OrderNo+"','"+data[i].PID+"','"+data[i].PName+"','"+data[i].Unit+"','"+data[i].Unit+"','"+data[i].UnitPrice+"','"+data[i].UnitPrice+"','"+data[i].ImgPath+"','"+input.CustomerId+"','"+datetime+"',0,1)";
  
               
                OrderModel.select_query(sqlr);
            }

             var sql="INSERT INTO Ecom_Orders (TONumber ,CustomerId,CouponId,Discount,Reason,TotalItemQty,DeliveryCharge,TotalPrice,NetPrice,Address,Area ,DeliveryTime,OrderStatus ,CreateBy ,CreateDate,[Delete],Active) "+
                  "VALUES('"+input.OrderNo+"','"+input.CustomerId+"','"+input.CouponId+"','"+discount+"','"+input.Reason+"',0,20,'"+total+"',"+total+",'"+input.Address+"','"+input.Aria+"','"+input.DeliveryTime+"',1,'"+input.CustomerId+"','"+datetime+"','"+input.Delete+"','"+input.Active+"')";
            
                 // console.log(sql);
                  OrderModel.select_query(sql);

            // // const CheckAuthentication = await Users.CheckAuthentication(auth_token);   // Check Authentication   
            //  if(CheckAuthentication){
            //      const checkUser = await Users.getUserByid(input.user_id); 
            //      console.log(checkUser); 
                //  if(checkUser.length > 0){ 
                //      var updateData = { 
                //         id    : input.user_id,      
                //         device_token : input.device_token,  
                //      }; 
                     /*var saveRecord = await Users.updateUserData(updateData);    
                     if(saveRecord){   
                         return res.send(JSON.stringify({  
                             "status": successStatus,
                             "message": 'User detail updated successfully.',  
                             "data": {},          
                         }));  
                     }else{
                         return res.send(JSON.stringify({ 
                             "status": failStatus,  
                             "message": 'Data could  not updated. Please try again.',
                             "data": respondeArray  
                         })); 
                     } */ 
                // }else{
                //     return res.send(JSON.stringify({ 
                //         "status": failStatus,  
                //         "message": 'Invalid user Id.',
                //         "data": respondeArray  
                //     }));
                // }  
            //  }else{
            //      return res.send(JSON.stringify({ 
            //          "status": failStatus,  
            //          "message": 'Session expired.',
            //          "data": respondeArray   
            //      })); 
            //  }  
            return res.send(JSON.stringify({
                "status": successStatus,
                 "message": 'Submit successfully.', 
            }));  

        }
         } 
     } catch (err) {
         return res.send(JSON.stringify({
             "status": failStatus,
             "message": err, 
         })); 
     }  
     return false;  
 }; 
 exports.OrderSubmit = OrderSubmit; 




 
async function ProfileUpdate(req, res) { 
    try {
         const { check, validationResult } = require('express-validator/check');
         var reaponseArr = '{}'; 
         var input = JSON.parse(JSON.stringify(req.body));  
         console.log(input); 
         //var auth_token = req.headers.authtoken; 
         req.checkBody('CID', 'Customer ID is required').notEmpty();
         req.checkBody('Name', 'Name is required').notEmpty(); 
         req.checkBody('Address', 'Address is required').notEmpty(); 
         var errors = req.validationErrors();  
       
         if(errors){	  		 
             return res.send(JSON.stringify({
                 "status": failStatus,
                 "message": errors[0].msg, 
             })); 	  		 
         }else{ 
           
     if (req.method == "POST") {             
    
       var imgname="";
       msg='Submit successfully.';   
        if (req.files && req.files.images !== "undefined") 
        { 
            let images = req.files.images;          
       
                 
          
             imgname =input.CID+".png";
             msg=imgname;
            // console.log(imgname);
            filename = images.name;   
                images.mv('assets/upload/'+imgname, function(err) { 
                    if (err){    
                        console.log(err);    
                        req.flash('error', 'Could not upload image. Please try again!')  
                        res.locals.message = req.flash();   
                      
                    }
                });
           
           

            
        }
        else{
            console.log(imgname);
        }
        var sql="update Ecom_Customers set name= '"+input.Name+"', Address='"+input.Address+"', area='"+input.Area+"', email='"+input.Email+"', FileImage ='"+imgname+"' where CID='"+input.CID+"'";
                            
                 
        OrderModel.select_query(sql);
       return res.send(JSON.stringify({
           "status": successStatus,
            "message":msg, 
       }));  
    }
        
    } 
     } catch (err) {
         return res.send(JSON.stringify({
             "status": failStatus,
             "message": err, 
         })); 
     }  
     return false;  
 }; 
 exports.ProfileUpdate = ProfileUpdate; 




 

 
async function signup(req, res) { 
    try {
         const { check, validationResult } = require('express-validator/check');
         var reaponseArr = '{}'; 
         var input = JSON.parse(JSON.stringify(req.body));  
         //console.log(input); 
         //var auth_token = req.headers.authtoken; 
         req.checkBody('MobileNo', 'MobileNo ID is required').notEmpty();
         req.checkBody('Name', 'Name is required').notEmpty(); 
         req.checkBody('Address', 'Address is required').notEmpty(); 
         var errors = req.validationErrors();  
       
         if(errors){	  		 
             return res.send(JSON.stringify({
                 "status": failStatus,
                 "message": errors[0].msg, 
             })); 	  		 
         }else{ 
           
     if (req.method == "POST") {             
    
       var imgname="";
       msg='Submit successfully.';   
        if (req.files && req.files.images !== "undefined") 
        { 
            let images = req.files.images;          
       
                 
          
             imgname =input.CID+".png";
             msg=imgname;
            // console.log(imgname);
            filename = images.name;   
                images.mv('assets/upload/'+imgname, function(err) { 
                    if (err){    
                        console.log(err);    
                        req.flash('error', 'Could not upload image. Please try again!')  
                        res.locals.message = req.flash();   
                      
                    }
                });
           
           

            
        }
        else{
            console.log(imgname);
        }

        var cid = parseInt(input.MobileNo);
        var toNomber = '+880';
        var sql="insert into Ecom_Customers (TONumber,name,Address,area,email,MobileNo,FileImage,cid, password) values( '"+toNomber+"','"+input.Name+"', '"+input.Address+"', '"+input.Area+"', '"+input.Email+"','"+input.MobileNo+"',  '"+imgname+"','"+cid+"','"+input.Password+"')";
                            
                 
        OrderModel.select_query(sql);
       return res.send(JSON.stringify({
           "status": successStatus,
            "message":msg, 
       }));  
    }
        
    } 
     } catch (err) {
         return res.send(JSON.stringify({
             "status": failStatus,
             "message": err, 
         })); 
     }  
     return false;  
 }; 
 exports.signup = signup; 



 
async function signin(req, res) { 
    try {
         const { check, validationResult } = require('express-validator/check');
         var reaponseArr = '{}'; 
         var input = JSON.parse(JSON.stringify(req.body));  
        // console.log(input); 
       
         req.checkBody('MobileNo', 'MobileNo ID is required').notEmpty();
         req.checkBody('Password', 'Password is required').notEmpty(); 
       
         var errors = req.validationErrors();  
       
         if(errors){	  		 
             return res.send(JSON.stringify({
                 "status": failStatus,
                 "message": errors[0].msg, 
             })); 	  		 
         }else{ 
           
     if (req.method == "POST") {             
    
          

       
        var sql="select * from Ecom_Customers where mobileno= '"+input.MobileNo+"' and Password ='"+input.Password+"' and active=1";
                            
             
        var Promise= OrderModel.select_query(sql);
        Promise.then(function(data){  
           //console.log(data.recordset);
            return res.send(data.recordset);  
         });

     
    }
        
    } 
     } catch (err) {
         return res.send(JSON.stringify({
             "status": failStatus,
             "message": err, 
         })); 
     }  
     return false;  
 }; 
 exports.signin = signin; 