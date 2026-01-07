let initialsId = 0;
export default class Player {
  constructor() {
    this.playerId = this.generatePlayerId();
    (this.x = 0), (this.y = 0), (this.collided = false);
  }

  static create() {
    return new Player();
  }

  generatePlayerId() {
     if (initialsId < 26) {
    return String.fromCharCode(65 + initialsId++);
  }

  const val = initialsId - 26;
  initialsId++;

  const ch = String.fromCharCode(65 + (val % 26));
  return ch + ch;
  }

  spawnPlayerAtEmptyPlace(row, col, gameBoard) {
    let cordinates = { x: 0, y: 0 };
    if (!this.isSlotAvail(gameBoard)) {
      throw new Error("all slots are Filled");
    }
    while (gameBoard[cordinates.x][cordinates.y] != "_") {
      cordinates = this.generateRandmoLocation(row, col);
    }
    this.x = cordinates.x;
    this.y = cordinates.y;
  }

  generateRandmoLocation(row, col) {
    return {
      x: Math.floor(Math.random() * row),
      y: Math.floor(Math.random() * col),
    };
  }
  

 nextMove(gameBoard,destination){
   

 }


  isSlotAvail(gameBoard) {
    for (let i = 0; gameBoard[0].length; i++) {
      for (let j = 0; gameBoard.length; j++) {
        if (gameBoard[i][j] == "_") {
          return true;
        }
      }
    }
    return false;
  }
}
