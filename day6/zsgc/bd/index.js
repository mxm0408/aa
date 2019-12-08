
var mysql = require('mysql');


module.exports=(sql,params=[])=>{
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'newlist'
    });
    
    connection.connect((error)=>{
        if(error){
            console.log("数据库连接失败")
        }else{
            console.log("数据库连接成功")
        }
    });
    
    return new Promise((resolve,reject)=>{
        connection.query(sql,params,(error,results)=>{
            if(error){
                reject(error)
            }else{
                resolve(results)
            }
            connection.end()
        })
    })
}