var ProductModel = require('../../models/admin/ProductsModel.js');
var ProductImages = require('../../models/admin/ProductImages.js');  

async function CategoryEntry(req, res) {  

    const { check, validationResult } = require('express-validator/check');   
    var input = JSON.parse(JSON.stringify(req.body)); 
   
        errorData = {};
        data={};
       if (req.method == "POST") { 
          
       // console.log(req.body);
       req.checkBody('Category', 'Category is required').notEmpty();
       req.checkBody('Category_BN', 'Category_BN is required').notEmpty();      
       req.checkBody('Description', 'Description is required').notEmpty();
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
           res.set('content-type' , 'text/html; charset=mycharset'); 
           res.render('Admin/Product/CategoryEntry.ejs', {title: '24Bigbazar.com | Category Entry', errors:errors, content: 'Category Information', data: data, action:"CategoryEntry", controller:'product'});
        }else{  
           
           var sqlquery="insert into ecom_products(PName, PName_BN,Category,Category_BN,Description,Description_BN, parentid,Active,rankid,ROL) values('"+input.Category+"', N'"+input.Category_BN+"','"+input.Category+"', N'"+input.Category_BN+"','"+input.Description+"',N'"+input.Description_BN+"','"+input.parentid+"','"+input.status+"','"+input.rankid+"',0)";
           //console.log(sqlquery);
           ProductModel.insert(sqlquery);  
           
           res.redirect('/Admin/product/CategoryList');
        
    }
      

   }else{
    var promise = ProductModel.select_query("select * from Ecom_Products where rol=0 and Active=1");
    promise.then(function(data){       
       res.set('content-type' , 'text/html; charset=mycharset'); 
       res.render('Admin/Product/CategoryEntry.ejs', {title: '24Bigbazar.com | Category Entry', content: 'Category Information', data: data.recordset, action:"CategoryEntry", controller:'product'});
   
    }).catch(function(err){
    res.status(500).send({ error: err });
    });    
      
   }   
};  
exports.CategoryEntry = CategoryEntry;

async function CategoryEdit(req, res) {  

    const { check, validationResult } = require('express-validator/check');   
    var input = JSON.parse(JSON.stringify(req.body)); 
   
        errorData = {};
        data={};
       if (req.method == "POST") { 
          
       // console.log(req.body);
       req.checkBody('Category', 'Category is required').notEmpty();
       req.checkBody('Category_BN', 'Category_BN is required').notEmpty();      
       req.checkBody('Description', 'Description is required').notEmpty();
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
           res.set('content-type' , 'text/html; charset=mycharset'); 
           res.render('Admin/Product/CategoryEdit.ejs', {title: '24Bigbazar.com | Category Entry', errors:errors, content: 'Category Information', data: data, action:"CategoryEdit", controller:'product'});
        }else{  
           
           var sqlquery="update  ecom_products set PName='"+input.Category+"', PName_BN=N'"+input.Category_BN+"',Category='"+input.Category+"',Category_BN=N'"+input.Category_BN+"',Description='"+input.Description+"',Description_BN=N'"+input.Description_BN+"', parentid='"+input.parentid+"',Active='"+input.status+"',rankid='"+input.rankid+"', ROL=0 where PID="+req.params.id;
         //  console.log(sqlquery);
           ProductModel.insert(sqlquery);  
           
           res.redirect('/Admin/product/CategoryList');
        
    }
      

   }else{
    var promise = ProductModel.select_query("select * from ecom_Products where rol=0 and Active=1");  
    promise.then(function(data){       

        var promisedata = ProductModel.select_query("select * from Ecom_products where PID="+req.params.id);
        var prdata={}; 
        promisedata.then(function(pdata)
        {
            prdata=pdata;
            res.set('content-type' , 'text/html; charset=mycharset'); 
            res.render('Admin/Product/CategoryEdit.ejs', {title: '24Bigbazar.com | Category Edit', content: 'Category Information', data:data.recordset, adata: prdata.recordset, action:"CategoryEdit", controller:'product' });
   
        }); 
       
      
    }).catch(function(err){
    res.status(500).send({ error: err });
    });    
      
   }   
};  
exports.CategoryEdit = CategoryEdit;

async function CategoryList(req, res) {  

   
    var data={};
        var promise = ProductModel.select_query("select * from Ecom_products where rol=0  and active=1");  
        promise.then(function(data){           

         
            res.set('content-type' , 'text/html; charset=mycharset'); 
            res.render('Admin/Product/CategoryList.ejs', {title: '24Bigbazar.com | Login', content: 'Category Information', data: data.recordset, action:"CategoryList", controller:'product'});
           
            }).catch(function(err){
                console.log(err);
                res.status(500).send({ error: err });
                //res.render('Admin/Product/CategoryList.ejs', {title: '24Bigbazar.com | Category', content: 'Category Information', data: data});
        
            });    
    
     
};  
exports.CategoryList = CategoryList;


async function ProductList(req, res) {  

   
    var data={};
        var promise = ProductModel.select_query("select  * from ecom_products where Active=1 order by RankId desc");  
        promise.then(function(data){           

         //  var t= data.filter(s=>s.gid==2);
          // console.log(JSON.stringify(t));

             
            res.set('content-type' , 'text/html; charset=mycharset'); 
            res.render('Admin/Product/ProductList.ejs', {title: '24Bigbazar.com | Product List', content: 'Product Information', data: data.recordset, action:"ProductList", controller:'product'});
           
            }).catch(function(err){
                console.log(err);
                res.status(500).send({ error: err });
                //res.render('Admin/Product/ProductList.ejs', {title: '24Bigbazar.com | Basic', content: 'Basic Information', data: data});
        
            });    
    
     
};  
exports.ProductList = ProductList;




async function ProductEntry(req, res) {  

    const { check, validationResult } = require('express-validator/check');   
    var input = JSON.parse(JSON.stringify(req.body)); 
   
        errorData = {};
        data={};
       if (req.method == "POST") { 
          
       // console.log(req.body);
       req.checkBody('PName', 'Name is required').notEmpty();
       req.checkBody('UnitPrice', 'Price is required').notEmpty();      
       req.checkBody('parentid', 'This is required').notEmpty();
       var errors = req.validationErrors();    
        if(errors){	  
            if(errors.length > 0){
                errors.forEach(function (errors1) {
                    var field1 = String(errors1.param); 
                    var msg = errors1.msg; 
                    errorData[field1] = msg;     
                });
            }  
           console.log(errors);
           var promise = ProductModel.select_query("select pid id ,  PName from Ecom_Products where rol=0 and Active=1 "); 
           promise.then(function(data){      
               var promisesup = ProductModel.select_query("select * from Ecom_Suppliers"); 
               promisesup.then(function(sdata){
                 //  console.log(sdata);
              res.set('content-type' , 'text/html; charset=mycharset'); 
              res.render('Admin/Product/ProductEntry.ejs', {title: '24Bigbazar.com | Basic Entry', content: 'Basic Information', data: data,action:"ProductEntry", controller:'product', data:data.recordset, sdata:sdata.recordset});
                })
            })
            }else{  
           
            var sqlquery="insert into ecom_products(PName, PName_BN,Brand,Brand_BN,Description,Description_BN, parentid,Active,rankid,ROL, mrp, unitprice, discount,UnitsInStock,SID) values('"+input.PName+"', N'"+input.PName_BN+"','"+input.Brand+"', N'"+input.Brand_BN+"','"+input.Description+"',N'"+input.Description_BN+"','"+input.parentid+"','"+input.status+"','"+input.rankid+"',1,'"+input.mrp+"','"+input.UnitPrice+"','"+input.discount+"',"+input.UnitsInStock+",'"+input.SID+"')";
             console.log(sqlquery);
           ProductModel.insert(sqlquery);  
           
           res.redirect('/Admin/product/productList');
        
    }
      

   }else{
    var promise = ProductModel.select_query("select pid id ,  PName from Ecom_Products where rol=0 and Active=1 "); 
   promise.then(function(data){      
        var promisesup = ProductModel.select_query("select * from Ecom_Suppliers"); 
        promisesup.then(function(sdata){
          //  console.log(sdata);
       res.set('content-type' , 'text/html; charset=mycharset'); 
       res.render('Admin/Product/ProductEntry.ejs', {title: '24Bigbazar.com | Basic Entry', content: 'Basic Information', data: data,action:"ProductEntry", controller:'product', data:data.recordset, sdata:sdata.recordset});
    })
    }).catch(function(err){
    res.status(500).send({ error: err });
    });    
      
   }   
};  
exports.ProductEntry = ProductEntry;



async function ProductEdit(req, res) {  

    const { check, validationResult } = require('express-validator/check');   
    var input = JSON.parse(JSON.stringify(req.body)); 
   
        errorData = {};
        data={};
       if (req.method == "POST") { 
          
       // console.log(req.body);
       req.checkBody('PName', 'Name is required').notEmpty();
       req.checkBody('UnitPrice', 'Price is required').notEmpty();      
       req.checkBody('parentid', 'This is required').notEmpty();
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
          var promise = ProductModel.select_query("select pid id ,  PName from Ecom_Products where rol=0 and Active=1 "); 
          promise.then(function(data){      
               var promisesup = ProductModel.select_query("select * from Ecom_Suppliers"); 
               promisesup.then(function(sdata){
                var predit=ProductModel.select_query("select * from Ecom_Products where pid="+req.params.id); 
                //  console.log(sdata);
                predit.then(function(edata){
                  res.set('content-type' , 'text/html; charset=mycharset'); 
                  res.render('Admin/Product/ProductEdit.ejs', {title: '24Bigbazar.com | Product Edit', content: 'Product Information', data: data,action:"ProductEdit", controller:'product', data:data.recordset, sdata:sdata.recordset,edata:edata.recordset});
            
                })        
               })
           })   
          }else{  
           
            var sqlquery="update  ecom_products set PName='"+input.PName+"', PName_BN=N'"+input.PName_BN+"',Brand='"+input.Brand+"',Brand_BN=N'"+input.Brand_BN+"',Description='"+input.Description+"',Description_BN=N'"+input.Description_BN+"', parentid='"+input.parentid+"',Active='"+input.status+"',rankid='"+input.rankid+"', ROL=1, mrp='"+input.mrp+"',UnitPrice='"+input.UnitPrice+"', discount='"+input.discount+"',UnitsInStock="+input.UnitsInStock+",SID='"+input.SID+"' where PID="+req.params.id;
            //console.log(sqlquery);
           ProductModel.insert(sqlquery);  
           
           res.redirect('/Admin/product/ProductList');
        
    }
      

   }else{
    var promise = ProductModel.select_query("select pid id ,  PName from Ecom_Products where rol=0 and Active=1 "); 
    promise.then(function(data){      
        var promisesup = ProductModel.select_query("select * from Ecom_Suppliers"); 
        promisesup.then(function(sdata){
            var predit=ProductModel.select_query("select * from Ecom_Products where pid="+req.params.id); 
          //  console.log(sdata);
          predit.then(function(edata){
            res.set('content-type' , 'text/html; charset=mycharset'); 
            res.render('Admin/Product/ProductEdit.ejs', {title: '24Bigbazar.com | Product Edit', content: 'Product Information', data: data,action:"ProductEdit", controller:'product', data:data.recordset, sdata:sdata.recordset,edata:edata.recordset});
      
          })
       })
    }) .catch(function(err){
    res.status(500).send({ error: err });
    });    
      
   }   
};  
exports.ProductEdit = ProductEdit;



async function images(req, res) {  
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {};    
    action = 'list'; 
    var id =  String("'"+req.params.id+"'"); 
    backURL=req.header('Referer') || '/';
    var imageArra = [];
    if (req.method == "POST") { 
       // console.log('nnnnnnnnnnnnnnn---');
        var input = JSON.parse(JSON.stringify(req.body)); 
       // console.log(input);
        if (req.files && req.files.images !== "undefined") { 
            
            let images = req.files.images; 
            var timestamp = new Date().getTime();     
            if(images && images.length > 0){    
              
                
                
                images.forEach(function (item, key) {  
                    filename =  item.name;    
                    console.log(filename);
                    item.mv('assets/upload/product_images/'+item.name, function(err) {
                        if (err){    
                            console.log(err);    
                            req.flash('error', 'Could not upload image. Please try again!')  
                            res.locals.message = req.flash();   
                            return res.redirect('/admin/product/images'); 
                        }else{
                            default_image = 0;
                            if(key === 0){  
                                default_image = 1;
                            }
                            var imagedata = {  
                                pid    : req.params.id,    
                                image :   item.name, 
                                default_image :  default_image      
                            };   
                            imageArra.push(imagedata); 
                            console.log(imagedata);
                            console.log(key);
                             ProductImages.saveDataCallback(imagedata,function(result){ 
                                if(result){

                                }
                             });
                        }  
                    });
                }); 

                req.flash('success', 'Images uploaded successfully.')   
                res.locals.message = req.flash(); 
                return res.redirect(backURL);  
            }else{
                filename = images.name;   
                images.mv('assets/upload/product_images/'+filename, function(err) { 
                    if (err){    
                        console.log(err);    
                        req.flash('error', 'Could not upload image. Please try again!')  
                        res.locals.message = req.flash();   
                        //return res.redirect(nodeAdminUrl+'/'+controller+'/images'); 
                        return res.redirect(backURL); 
                    }else{
                         
                        var imagedata = {  
                            pid    : req.params.id,    
                            image :   filename,
                            default_image :  1     
                        };   
                        imageArra.push(imagedata); 
                        
                        ProductImages.saveDataCallback(imagedata,function(result){ 
                            req.flash('success', 'Images uploaded successfully.')   
                            res.locals.message = req.flash();  
                          
                        });
                          
                        
                    }  
                });
                req.flash('success', 'Images uploaded successfully.')   
                res.locals.message = req.flash(); 
                return res.redirect(backURL); 
            }    
           // console.log(imageArra); return true; 
        }        
          
    }

  const allRecord = await ProductImages.getByProductId(id);  
  //console.log(allRecord);
    res.render('Admin/Product/images.ejs',{
        title:" Images",
        data:allRecord.recordset, 
        content:"Image Upload",
        action:"ProductList",
        controller:'product',
        id:req.params.id
    });     
};      
exports.images = images;



async function deleteImage(req, res) { 
   
    var categoryDetail = {}; 
    backURL=req.header('Referer') || '/'; 
    if(req.params.id){
        var id =  String("'"+req.params.id+"'");    
        entityDetail = await ProductImages.deleteRecord(id);   
        if(entityDetail.length == 0){  
            req.flash('error', 'Invalid url')    
        }else{
            req.flash('success', 'Record deleted succesfully.');      
        }   
    }else{ 
        req.flash('error', 'Invalid url.');    
    }    
    return res.redirect(backURL); 
};          
exports.deleteImage = deleteImage;  

/** 
 *  setDefaultImage
 *  Purpose: This function is used to set setDefaultImage 
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json  
*/
async function setDefaultImage(req, res) { 
   
    var categoryDetail = {}; 
    backURL=req.header('Referer') || '/'; 
    if(req.params.id){
        var id =  String("'"+req.params.id+"'");    
        var pid =  String("'"+req.params.pid+"'");
           
        //entityDetail = await ProductImages.resetDefaultImage(product_id);   
        entityDetail = await ProductImages.setDefaultImage(id, pid);   
        if(entityDetail.length == 0){  
            req.flash('error', 'Invalid url')    
        }else{
            req.flash('success', 'Record updated succesfully.');       
        }   
    }else{ 
        req.flash('error', 'Invalid url.');  
    }    
    return res.redirect(backURL); 
};          
exports.setDefaultImage = setDefaultImage; 
   

   