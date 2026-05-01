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
  console.log("Room created: " + code);

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

    io.to(code).emit('roomState', rooms[code]);

    return {ok: true, roomCode: code, role: "player"};
  }
  else {
    return {ok: false, error: "Room does not exist"};
  }
}

function disconnect(socket){
  const code = socket.roomCode;
  if (!code) return;

  const room = rooms[code];
  if (!room) return;

  delete room.players[socket.id];

  // if admin left OR room empty → delete room
  if (room.admin === socket.id || Object.keys(room.players).length === 0) {
    delete rooms[code];
    return;
  }

  io.to(code).emit('roomState', room);
}

function listRooms(){
  return Object.keys(rooms);
}

function getRoom(code){
  return rooms[code];
}

module.exports = {createRoom, joinRoom, disconnect, listRooms, getRoom};
