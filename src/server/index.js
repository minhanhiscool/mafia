const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(express.static(path.join(__dirname, '../client/')));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {origin: '*'}
});

io.on('connection', (socket) => {
  console.log('a user connected');
  require('./socket/roomHandler')(io, socket);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

