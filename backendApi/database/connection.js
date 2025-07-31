const mysql = require('mysql2')
const credential = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
}

const connection = mysql.createConnection(credential)

connection.connect(err =>{
    if (err) {
        throw err
    }
    console.info('db connection succesfull')
})

module.exports = connection