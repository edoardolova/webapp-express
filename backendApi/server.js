const express = require('express');
const app = express();
const port = process.env.PORT;
const connection = require('./database/connection.js')

app.listen(port, ()=>{
    console.log(`listening at port: ${port}`)
})

