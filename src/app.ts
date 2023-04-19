const express = require('express');
const bodyParser = require('body-parser');
const authRoutes =  require('../routes/auth');

const app = express();
require("dotenv").config();

app.use(bodyParser.json());

app.use('/auth',authRoutes);
app.listen(process.env.PORT_NUMBER,(err:Error)=>{
    if(err)
    console.log(err);
    else
    console.log(`Server listening on port ${process.env.PORT_NUMBER}`)
})