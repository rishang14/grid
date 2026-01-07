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

  nextMove(gameBoard, destination) {
    // in this i have to check and update
    //1. if already collided return
    //2. if at winning pos return
    //3. else move towards the winning pos
    //4. update the gameBoard

    if (this.collided) {
      return;
    }

    if (this.x === destination.x && this.y === destination.y) {
      return;
    }

    if (gameBoard[this.x][this.y] === this.playerId) {
      gameBoard[this.x][this.y] = "_"; // make it empty bcz i have to move to new pos
    }

    let toMoveX = destination.x - this.x;
    let toMoveY = destination.y - this.y;

    let stepX = Math.sign(toMoveX);
    let stepY = Math.sign(toMoveY);

    let newPosX = this.x + stepX;
    let newPosY = this.y + stepY;

    if (
      newPosX < 0 ||
      newPosY < 0 ||
      newPosX >= gameBoard.length ||
      newPosY >= gameBoard[0].length
    ) {
      return;
    }
    this.x = newPosX;
    this.y = newPosY;

    gameBoard[this.x][this.y] = this.playerId;
  }

  isSlotAvail(gameBoard) {
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0;j< gameBoard[0].length; j++) {
        if (gameBoard[i][j] == "_") {
          return true;
        }
      }
    }
    return false;
  }
}
