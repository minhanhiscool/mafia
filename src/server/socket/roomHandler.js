const {createRoom, joinRoom, disconnect} = require('../game/roomLogic.js');

module.exports = (io, socket) => {
  socket.on('createRoom', (name) => {
    console.log("createRoom");
    const room = createRoom(socket, name);
    socket.emit("roomCreated", room);
  });


  socket.on('joinRoom', ({code, name}) => {
    console.log("joinRoom");
    const room = joinRoom(socket, code, name);
    socket.emit("roomJoined", room);
  });

  socket.on('disconnect', () => {
    console.log("disconnect");
    disconnect(socket);
  });
}
