
const mysql = require("mysql");



module.exports = (sql, params = []) => {
    let connection = mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "root",
        database: "mxm"
    })

    connection.connect((error) => {
        if (error) {
            console.log("数据库错误")
        } else {
            console.log("数据库正确")
        }
    })
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
        connection.end()
    })
}