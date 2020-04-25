const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'chatCord Bot';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({username, room}) => {

    
     // Welcome current user 
     socket.emit('message',formatMessage(botName, 'Welcome to ChatCord!'));

     // Broadcast when a user connects 
     socket.broadcast.emit('Message',formatMessage(botName, 'A user has joined the chat'));

  });
    
   

    // Run when client disconects 
    socket.on('disconnect', () =>{
        io.emit('message',formatMessage(botName, 'A user has left the chat'));
    });

    // listen to chatMessage 
    socket.on('chatMessage', msg => {
      io.emit('message',formatMessage('USER', msg));
    });    
  });

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));