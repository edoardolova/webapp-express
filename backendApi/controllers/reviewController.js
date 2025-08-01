const connection = require('../database/connection.js')

function index(req, res){
    const sql = 'SELECT * FROM reviews';
    connection.query(sql, (err, result)=>{
        if (err) {
            return res.status(500).json({error: err.message})
        }
        res.json(result)
    })
}



module.exports = {index}