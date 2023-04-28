const express = require('express');
require('dotenv').config();
const {Server} = require('socket.io');
const {createServer} = require('http');

const app = express();
const httpServer =createServer(app);
const io = new Server(httpServer);

io.on("connection",(socket)=>{
    
    console.log(`client connected ${socket.id}`);
    socket.on('message',(evt)=>{
        console.log("logging evt "+evt);
        let  message = {};
        message.username = evt.username || socket.id;
        message.message = evt.message;
        console.log(message);
        socket.broadcast.emit('message',message);
    })
})

io.on("disconnect",(socket)=>{
    console.log(`${socket.id} has been dicsonnected`);
})


const port = process.env.SOCKET_SERVER_PORT_NUMBER || 8000;
httpServer.listen(port,()=>{console.log(`Server listening on PORT ${port}`)});