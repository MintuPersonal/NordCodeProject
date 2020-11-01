var OrderModel = require('../../models/admin/OrderModel');



async function OrderList(req, res) {  

   
    var data={};
        var promise = OrderModel.select_query("select * from Ecom_Orders where orderstatus=1; select * from Ecom_Customers");  
        promise.then(function(data){           

       

             
            res.set('content-type' , 'text/html; charset=mycharset'); 
            res.render('Admin/Order/OrderList.ejs', {title: '24Bigbazar.com | User', content: 'Order Information', data: data.recordsets, action:"OrderList", controller:'Order'});
           
            }).catch(function(err){
                console.log(err);
                res.status(500).send({ error: err });
                 
            });    
    
     
};  
exports.OrderList = OrderList;


async function OrderCompletedList(req, res) {  

   
    var data={};
        var promise = OrderModel.select_query("select * from Ecom_Orders where orderstatus in(2,3,4); select * from Ecom_Customers");  
        promise.then(function(data){           

       

             
            res.set('content-type' , 'text/html; charset=mycharset'); 
            res.render('Admin/Order/OrderCompletedList.ejs', {title: '24Bigbazar.com | User', content: 'Order Information', data: data.recordsets, action:"OrderCompletedList", controller:'Order'});
           
            }).catch(function(err){
                console.log(err);
                res.status(500).send({ error: err });
                 
            });    
    
     
};  
exports.OrderCompletedList = OrderCompletedList;


async function OrderDetails(req, res) {  

   
    var data={};
        var promise = OrderModel.select_query("select * from Ecom_Orders where TONumber='"+req.params.id+"' ; select * from Ecom_OrderDetails where TONumber='"+req.params.id+"' ; select * from Ecom_Customers where CID= convert (nvarchar(20) ,(select top 1 customerid from Ecom_Orders where TONumber='"+req.params.id+"')); select * from ecom_serviceman;");  
        promise.then(function(data){           

       

             
            res.set('content-type' , 'text/html; charset=mycharset'); 
            res.render('Admin/Order/OrderDetails.ejs', {title: '24Bigbazar.com | User', content: 'Order Information', data: data.recordsets, action:"OrderList", controller:'Order'});
           
            }).catch(function(err){
                console.log(err);
                res.status(500).send({ error: err });
                 
            });    
    
     
};  
exports.OrderDetails = OrderDetails;



async function OrderPrint(req, res) {  

   
    var data={};
        var promise = OrderModel.select_query("select * from Ecom_Orders where TONumber='"+req.params.id+"' ; select * from Ecom_OrderDetails where TONumber='"+req.params.id+"' ; select * from Ecom_Customers");  
        promise.then(function(data){           

       

             
            res.set('content-type' , 'text/html; charset=mycharset'); 
            res.render('Admin/Order/OrderPrint.ejs', {title: '24Bigbazar.com | User', content: 'Order Information', data: data.recordsets, action:"OrderList", controller:'Order'});
           
            }).catch(function(err){
                console.log(err);
                res.status(500).send({ error: err });
                 
            });    
    
     
};  
exports.OrderPrint = OrderPrint;




async function OrderUpdate(req,res) {  

    var input=req.body;
   
    OrderModel.select_query("update Ecom_Orders set OID="+input.OID+" , OrderStatus="+input.OrderStatus+" where TONumber='"+input.TONumber+"' ;");  

  
    return "Submit Successful";
     
};  
exports.OrderUpdate = OrderUpdate;