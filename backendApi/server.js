const express = require('express');
const app = express();
const port = process.env.PORT;
const connection = require('./database/connection.js')

app.listen(port, ()=>{
    console.log(`listening at port: ${port}`)
})

// home 
app.get('/',(req, res)=>{
    res.send('welcome movie')
})

// index 
app.get('/movies', (req, res)=>{
    const sql = 'SELECT * FROM movies';
    connection.query(sql, (err, result)=>{
        if (err) {
            return res.status(500).json({error: err.message})
        }

        res.json(result)
    })
})

// show 
app.get('/movies/:id', (req,res)=>{
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

        const reviewsSql = `SELECT * FROM reviews WHERE movie_id = ?`;
        connection.query(reviewsSql, [id], (err, result)=>{
            if (err) {
                return res.status(500).json({error: err.message})
            }

            movie.reviews = result;
            res.json(movie)
        })
    })
})