const socket = io("http://localhost:3000");

function show(view) {
  document.getElementById("lobby").style.display = "none";
  document.getElementById("admin").style.display = "none";
  document.getElementById("player").style.display = "none";

  document.getElementById(view).style.display = "block";
}

function createRoom() {
  const name = document.getElementById("name").value;
  socket.emit("createRoom", name);

  socket.on("roomCreated", (room) => {
    console.log(room);
    show("admin");
  });
}
