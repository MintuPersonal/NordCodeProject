

function ProductsModel(){
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
            msconnection.query('select * from setting',function(err, rows){
                if (!err){
                    resolve(rows);
                }
                else{
                    reject(err);
                }
            });
        });
    }

    this.select_query = function(sql_query){

        return new Promise(function(resolve, reject){
            msconnection.query(sql_query,function(err, recordset){
                if (!err){
                    resolve(recordset);
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

module.exports = new ProductsModel();