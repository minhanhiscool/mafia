export function getPlayerID(){
  let playerID = localStorage.getItem('playerID');

  if (!playerID) {
    playerID = crypto.randomUUID();
    localStorage.setItem('playerID', playerID);
  }

  return playerID;
}
