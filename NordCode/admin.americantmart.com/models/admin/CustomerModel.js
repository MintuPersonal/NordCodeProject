function CustomerModel(){
    this.insert = function(sqlquery)
    {
        return new Promise(function(resolve, reject){
            msconnection.query(sqlquery,function(err, rows){
                if (!err){
                    resolve(rows);
                }
                else{
                    reject(err);
                }
            });
        });
    }

    this.select = function(userid ,pwd){

        return new Promise(function(resolve, reject){
            //console.log("select * from ecom_users where username='"+userid+"' and password='"+pwd+"'");
            msconnection.query("select * from ecom_users where username='"+userid+"' and password='"+pwd+"'",function(err, rows){
                if (!err){
                    resolve(rows);
                }
                else{
                    reject(err);
                }
            });
        });
    }
    this.select_query = function(sqlquery){

        return new Promise(function(resolve, reject){
               msconnection.query(sqlquery,function(err, rows){
                if (!err){
                    resolve(rows);
                }
                else{
                    reject(err);
                }
            });
        });
    }


    this.update = function(){

    }

    this.delete = function(){

    }
}

module.exports = new CustomerModel();