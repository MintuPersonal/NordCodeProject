//var sync = require('synchronize');
const table = 'Ecom_ProductIamges';
 

/** 
 *  getAllData
 *  Purpose: This function is used to getAllData
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/
async function getAllData() {	  
	try {   
			var sql='select * from '+table+' where is_deleted = 0 ORDER BY id DESC';    
			return new Promise((resolve,reject)=>{
				connectPool.query(sql, (err, result) => {
					if (err) { 
						reject(err)
					} else {  
						resolve(result)
					}
				})
			}).catch(function(e){
				return e; 
		});
		 
	}finally {
	 
	} 
}
/** 
 *  getAllData
 *  Purpose: This function is used to getAllData
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/
async function getByProductId(product_id) {	  
	try {   
			var sql='select * from '+table+' where pid ='+product_id;
			//console.log(sql);    
			return new Promise((resolve,reject)=>{
				msconnection.query(sql, (err, result) => {
					if (err) { 
						reject(err)
					} else {  
						resolve(result)
					}
				})
			}).catch(function(e){
				return e; 
		});
		 
	}finally {
	 
	} 
}
 
function saveDataCallback(data,callback)
{	 
	
	var sql="INSERT INTO Ecom_ProductIamges(pid,image,default_image) values("+data.pid+",'"+data.image+"',"+data.default_image+") ";    
		msconnection.query(sql,function(err, rows){
			if (!err){
				callback(false); 
			}
			else{
				callback(rows);
			}
		});

}


/** 
 *  deleteRecord
 *  Purpose: This function is used to deleteRecord
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/
async function deleteRecord(id) {	  
	try { 
		if(id){ 
			var sql='delete  from '+table+' where id = '+ id;   
			return new Promise((resolve,reject)=>{
				msconnection.query(sql, (err, result) => {
					if (err) { 
						reject(err)
					} else { 
						resolve(result)
					}
				})
			})
		}else{
			return null;
		}
	} finally {
	 
	} 
} 

/** 
 *  deleteRecord
 *  Purpose: This function is used to deleteRecord
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/
async function setDefaultImage(id, pid) {	  
	try { 
		if(id){ 

			var sql1='UPDATE '+table+' set default_image = 0 where pid = '+ pid;  
			msconnection.query(sql1, (err, result) => {
				console.log(result); 
			});  
			var sql='update ecom_products  set imgPath=(select top 1 image from Ecom_ProductIamges where id='+id+' ) where pid='+pid+'; update '+table+' set default_image = 1 where id = '+ id;   
			// console.log(sql);
				return new Promise((resolve,reject)=>{
					msconnection.query(sql, (err, result1) => {
						if (err) {  
							reject(err)
						} else { 
							console.log(result1); 
							resolve(result1)
						}
					}) 
				})
		}else{
			return null;
		}
	} finally {
	 
	} 
} 

/** 
 *  saveData
 *  Purpose: This function is used to saveData
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json 
*/
async function saveData(data) { 
	try { 
		if(data){   
			var sql='INSERT INTO '+table+' set ? ';
			return new Promise((resolve,reject)=>{
				connectPool.query(sql,data, (err, result) => {
					if (err) { 
						console.log(data);
						reject(err)
					} else { 
						resolve(result)
					}
				})
			}) 
		}else{ 
			return null;
		}
	} finally {
		//if (connectPool && connectPool.end) connectPool.end();
	}  
}

/** 
 *  getAllData
 *  Purpose: This function is used to getAllData
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/
async function getDefaultImage(product_id) {	  
	try {   
		var sql='select * from '+table+' where product_id ='+product_id+' AND  default_image = 1'; 
			return new Promise((resolve,reject)=>{
				msconnection.query(sql, (err, result) => {
					if (err) { 
						reject(err)
					} else {  
						resolve(result)
					}
				})
			}).catch(function(e){
				return e; 
		});
		 
	}finally {
	 
	} 
}
   
   

module.exports={
	getByProductId,
	saveData,  
	getAllData,
	deleteRecord,  
	saveDataCallback,
	getDefaultImage,
	setDefaultImage,
	
}; 
