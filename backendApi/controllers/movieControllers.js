const connection = require('../database/connection.js')
const slugify = require('slugify');

// multer
const path = require('path');

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


function store(req, res) {
    const { title, director, genre, release_year, abstract } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: 'Immagine mancante' });
    }

    const imageFileName = req.file.filename; 

    const sql = `
        INSERT INTO movies (title, director, genre, release_year, abstract, image, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const values = [title, director, genre, release_year, abstract, imageFileName];

    connection.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: 'Film aggiunto con successo',
            movie: {
                id: result.insertId,
                title,
                director,
                genre,
                release_year,
                abstract,
                image: `http://localhost:${process.env.PORT}/${imageFileName}`
            }
        });
    });
}

module.exports ={
    index,
    show,
    store
}