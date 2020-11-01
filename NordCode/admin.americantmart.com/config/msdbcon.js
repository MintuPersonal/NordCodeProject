var mssql = require("mssql");
 // config for your database
 var config = {
    user: 'sa',
    password: '0nE!ct@DB',
    server: '10.11.4.153', 
    database: 'ERP_AmericanTMart' ,
    port:1433,
    driver: 'tedious', "options": { "encrypt": false , "enableArithAbort": true },
};

 
    mssql.connect(config, function (err) {
      //  console.log(err);
    
        if(!err) {
            console.log("Database is connected ...\nLogger: \n");    
        } else {
            console.log("Error mssql server connecting database ...\nLogger: \n");    
        }

        // create Request object
     
     
    });
    var  msconnection = new mssql.Request();

    module.exports = msconnection;
    
