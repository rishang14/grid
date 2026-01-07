let gameId = 1;
export default class Game {
  constructor(n, m) {
    (this.gameId = gameId++),
      (this.rows = n),
      (this.cols = m),
      (this.turn = 0),
      (this.gameBoard = Array.from({ length: n }, () => Array(m).fill("_")));
    this.destination = this.generateRandomDestination(); 
    this.gameBoard[this.destination.x][this.destination.y]='X';
  }

  static create(n, m) {
    if (!Number.isInteger(n) || !Number.isInteger(m)) {
      throw new Error("Only accepts int val");
    }
    return new Game(n, m);
  }

  generateRandomDestination() {
    return {
      x: Math.floor(Math.random() * this.rows),
      y: Math.floor(Math.random() * this.cols),
    };
  }

  start() {
    console.log(`Game ${"0" + this.gameId} turn ${this.turn}`);

    console.log(`Game destination ${JSON.stringify(this.destination)}`);

    for (let i = 0; i < this.rows; i++) {
      let show = "";
      for (let j = 0; j < this.cols; j++) {
        show += this.gameBoard[i][j] + "  ";
      }
      console.log(show);
    }
  }
}
