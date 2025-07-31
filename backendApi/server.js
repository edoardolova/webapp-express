const express = require('express');
const app = express();
const port = process.env.PORT;
const movieRouter = require('./routers/movieRouter.js')
const errorsHandler = require("./middlewares/errorsHandler.js");
const notFoundHandler = require("./middlewares/notFoundHandler.js");

app.use(express.static('public'));
app.use('/movies', movieRouter)
app.listen(port, ()=>{
    console.log(`listening at port: ${port}`)
})


// home 
app.get('/',(req, res)=>{
    res.send('welcome movie')
})

app.use(notFoundHandler);
app.use(errorsHandler);



