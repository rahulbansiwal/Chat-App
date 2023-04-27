const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const app = express();


require("dotenv").config();
const dbConection = require('./db/db');

const port = process.env.PORT_NUMBER || 80;

app.use(bodyParser.json());

app.use('/auth', authRoutes);

const start = async () => {
    try{
        await dbConection(process.env.MONGO_URI);
        app.listen(port,()=>
        console.log(`DB Connected, Server listening on PORT ${port}`)
        );
    } catch(err){
        console.log(err);
    }
};
start();

