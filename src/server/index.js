const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const readline = require('readline');
const { listRooms, getRoom } = require('./game/roomLogic.js');

const server = http.createServer();
const io = new Server(server, {
  cors: {origin: '*'}
});

const rl = readline.createInterface({
  input: process.stdin,
  output: null
});

io.on('connection', (socket) => {
  console.log('a user connected');
  require('./socket/roomHandler')(io, socket);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

rl.on('line', (input) => {
  const args = input.split(' ');

  switch (args[0]) {
    case 'rooms':
      listRooms().forEach(r => console.log(r));
      break;

    case 'room':
      if (args[1]) {
        const room = getRoom(args[1]);
        if (room) {
          console.log(room);
        }
        else {
          console.log('Room does not exist');
        }
      }
      else {
        console.log('Missing room code');
      }
      break;

    default:
      console.log('Unknown command');
  }
});
