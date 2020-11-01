

function SuppliersModel(){
    this.insert = function(sql_query)
    {
        return new Promise(function(resolve, reject){
            msconnection.query(sql_query,function(err, rows){
                if (!err){
                    resolve(rows);
                }
                else{
                    reject(err);
                }
            });
        });
    }

    
    this.select = function(){

        return new Promise(function(resolve, reject){
            msconnection.query('select * from ecom_suppliers',function(err, rows){
                if (!err){
                    resolve(rows);
                }
                else{
                    reject(err);
                }
            });
        });
    }
    this.selectByQuery = function(sql_query){

        return new Promise(function(resolve, reject){
            msconnection.query(sql_query,function(err, rows){
                if (!err){
                    resolve(rows);
                }
                else{
                    reject(err);
                }
            });
        });
    }

    this.select_group = function(){

        return new Promise(function(resolve, reject){
            msconnection.query('select gid,max(gtext) gtext from ecom_settings group by gid',function(err, rows){
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

module.exports = new SuppliersModel();