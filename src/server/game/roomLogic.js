const rooms = {};

function createRoom(socket, name){
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  rooms[code] = {
    code: code,
    players: {},
    admin: socket.id
  };

  rooms[code].players[socket.id] = {
    name,
    role: "admin",
    alive: true
  };

  socket.join(code);

  return {roomCode: code, role: "admin"};
}

module.exports = {createRoom};
