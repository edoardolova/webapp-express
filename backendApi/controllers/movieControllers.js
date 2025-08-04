const connection = require('../database/connection.js')
const slugify = require('slugify');

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


// Mostra film per slug
function show(req, res) {
    const slug = req.params.slug;  

    const movieSql = `SELECT * FROM movies`;
    connection.query(movieSql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const movie = result.find(film => slugify(film.title, { lower: true, replacement: '-' }) === slug);
        
        if (!movie) {
            return res.status(404).json({ mess: 'Film non trovato' });
        }

        movie.image = `http://localhost:${process.env.PORT}/${movie.image}`;

        const reviewsSql = `SELECT * FROM reviews WHERE movie_id = ?`;
        connection.query(reviewsSql, [movie.id], (err, reviewsResult) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            movie.reviews = reviewsResult;
            res.json(movie);
        });
    });
}

module.exports ={
    index,
    show
}