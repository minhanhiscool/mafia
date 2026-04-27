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

function joinRoom(socket, code, name){
  if (rooms[code]){
    rooms[code].players[socket.id] = {
      name,
      role: "player",
      alive: true
    };

    socket.join(code);
    return {ok: true, roomCode: code, role: "player"};
  }
  else {
    return {ok: false, error: "Room does not exist"};
  }
}

module.exports = {createRoom, joinRoom};
