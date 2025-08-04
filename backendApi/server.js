const express = require('express');
const app = express();
const port = process.env.PORT;
const movieRouter = require('./routers/movieRouter.js')
const errorsHandler = require("./middlewares/errorsHandler.js");
const notFoundHandler = require("./middlewares/notFoundHandler.js");
const reviewRouter = require("./routers/reviewRouter.js")

// cors 
const cors = require('cors')
// parsing req body for post
app.use(express.json());

app.use(cors())
app.use(express.static('public'));
app.use('/movies', movieRouter)
app.listen(port, ()=>{
    console.log(`listening at port: ${port}`)
})

app.use('/reviews', reviewRouter);


// home 
app.get('/',(req, res)=>{
    res.send('welcome movie')
})

app.use(notFoundHandler);
app.use(errorsHandler);



