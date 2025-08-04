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

function addReview(req, res) {
    console.log('Request Body:', req.body);
    const { movie_id, name, text, vote } = req.body;

    // Verifica se tutti i campi sono presenti
    if (!name || !text || !vote || !movie_id) {
        return res.status(400).json({ error: "Tutti i campi sono obbligatori" });
    }

    const reviewSql = `INSERT INTO reviews (movie_id, name, text, vote, created_at, updated_at) 
                       VALUES (?, ?, ?, ?, NOW(), NOW())`;

    connection.query(reviewSql, [movie_id, name, text, vote], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            id: result.insertId,
            movie_id,
            name,
            text,
            vote,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });
    });
}



module.exports = {index, addReview }