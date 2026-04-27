const {createRoom, joinRoom} = require('../game/roomLogic.js');

module.exports = (io, socket) => {
  socket.on('createRoom', (name) => {
    console.log("createRoom");
    const room = createRoom(socket, name);
    socket.emit("roomCreated", room);
  });
}
