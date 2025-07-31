const connection = require('../database/connection.js')

function index(req, res){
    const sql = 'SELECT * FROM movies';
    connection.query(sql, (err, result)=>{
        if (err) {
            return res.status(500).json({error: err.message})
        }

        const movies = result.map(movie => {
            return{
                ...movie,
                image: `http://localhost:${process.env.port}/${movie.image}`
            }
        })

        res.json(movies)
    })
}

function show (req,res){
    const id = parseInt(req.params.id)
    const movieSql = `SELECT * FROM movies WHERE id = ?`

    connection.query(movieSql, [id], (err, result)=>{
        if (err) {
            return res.status(500).json({error: err.message})
        }
        if (result.length === 0) {
            return res.status(404).json({mess: 'risorsa non trovata'})
        }
        const movie = result[0];
        movie.image = `http://localhost:${process.env.port}/${movie.image}`

        const reviewsSql = `SELECT * FROM reviews WHERE movie_id = ?`;
        connection.query(reviewsSql, [id], (err, result)=>{
            if (err) {
                return res.status(500).json({error: err.message})
            }

            movie.reviews = result;
            res.json(movie)
        })
    })
}

module.exports ={
    index,
    show
}