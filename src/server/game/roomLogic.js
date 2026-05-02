const rooms = {};

function createRoom(socket, name, playerID){
  let code = '';

  do {
    code = Math.random().toString(36).substring(2, 8).toUpperCase();
  } while (rooms[code]);

  rooms[code] = {
    code: code,
    players: {},
    admin: playerID
  };

  rooms[code].players[playerID] = {
    name,
    role: "admin",
    alive: true,
    socketID: socket.id
  };

  socket.roomCode = code;
  socket.playerID = playerID;

  socket.join(code);
  console.log("Room created: " + code);

  return {roomCode: code, role: "admin"};
}

function joinRoom(io, socket, code, name, playerID){
  const room = rooms[code];
  if (!room) return {ok: false, error: "Room does not exist"};

  socket.roomCode = code;
  socket.playerID = playerID;

  if (room.players[playerID]){
    if (room.players[playerID].name !== name) {
      return {
        ok: false,
        warning: true,
        oldName: room.players[playerID].name,
        newName: name,
      }
    }

    room.players[playerID].socketID = socket.id;
    socket.join(code);
    io.to(code).emit('roomState', room);

    return {ok: true, roomCode: code, role: room.players[playerID].role};
  }

  room.players[playerID] = {
    name,
    role: "player",
    alive: true,
    socketID: socket.id
  };

  socket.join(code);
  io.to(code).emit('roomState', room);

  return {ok: true, roomCode: code, role: "player"};

}
function confirmNameChange(io, socket, code, playerID, name) {
  console.log(code, playerID, name);
  console.log(rooms); const room = rooms[code];
  if (!room) return;


  const player = room.players[playerID];
  if (!player) return;

  player.name = name;
  player.socketID = socket.id;

  socket.roomCode = code;
  socket.playerID = playerID;

  socket.join(code);
  io.to(code).emit('roomState', room);

  return {ok: true, roomCode: code, role: player.role};
}

function disconnect(io, socket){
  const code = socket.roomCode;
  const playerID = socket.playerID;
  if (!code) return;

  const room = rooms[code];
  if (!room) return;

  delete room.players[playerID];
  if (Object.keys(room.players).length === 0) {
    delete rooms[code];
    return;
  }

  if (room.admin === playerID) {
    const newAdmin = Object.keys(room.players)[0];
    room.admin = newAdmin;
    room.players[newAdmin].role = "admin";
  }

  io.to(code).emit('roomState', room);
}

function queryRoom(socket, roomCode){
  return rooms[roomCode];
}

function listRooms(){
  return Object.keys(rooms);
}

function getRoom(code){
  return rooms[code];
}

module.exports = {createRoom, joinRoom, confirmNameChange, disconnect, listRooms, getRoom, queryRoom};
