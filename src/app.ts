const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require("dotenv").config();

app.use(bodyParser.json());


app.listen(process.env.PORT_NUMBER,(err:Error)=>{
    if(err)
    console.log(err);
    else
    console.log(`Server listening on port ${process.env.PORT_NUMBER}`)
})