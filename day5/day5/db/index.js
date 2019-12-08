
const  mysql=require("mysql")

let connection=mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"root",
    database:"baiyang"
})

connection.connect((error)=>{
    if(error){
        console.log("数据库连接失败")
    }else{
        console.log("数据库连接成功")
    }
})

module.exports=connection