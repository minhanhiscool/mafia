const {createRoom, joinRoom, confirmNameChange, disconnect, queryRoom} = require('../game/roomLogic.js');

module.exports = (io, socket) => {
  socket.on('createRoom', ({name, playerID}) => {
    console.log("createRoom");
    const room = createRoom(socket, name, playerID);
    socket.emit("roomCreated", room);
  });

  socket.on('joinRoom', ({code, name, playerID}) => {
    console.log("joinRoom");
    const resp = joinRoom(io, socket, code, name, playerID);
    console.log(resp);
    socket.emit("roomJoined", resp);
  });

  socket.on('confirmNameChange', ({code, playerID, name}) => {
    console.log("confirmNameChange");
    const resp = confirmNameChange(io, socket, code, playerID, name);
    console.log(resp);
    socket.emit('joinConfirmed', resp);
  });

  socket.on('queryRoom', (roomCode) => {
    console.log("queryRoom");
    const resp = queryRoom(socket, roomCode);
    socket.emit('roomState', resp);
  });

  socket.on('disconnect', () => {
    console.log("disconnect");
    disconnect(io, socket);
  });
}
