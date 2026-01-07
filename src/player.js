export default class Player {
  constructor() {
    this.playerId = this.generatePlayerId();
    (this.x = 0),
     (this.y = 0), 
     (this.collided = false);
  }

  static create() {
    return new Player();
  }

  generatePlayerId() {
    return "A";
  }

  spawnPlayerAtEmptyPlace(row, col, gameBoard) {
    let cordinates = {x:0,y:0}
    while (gameBoard[cordinates.x][cordinates.y] != "_"){
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
}
