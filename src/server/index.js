const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
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

