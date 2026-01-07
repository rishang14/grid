let gameId = 1;
export default class Game {
  constructor(n, m) {
    (this.gameId = gameId++),
      (this.rows = n),
      (this.cols = m),
      (this.turn = 0),
      (this.gameBoard = Array.from({ length: n }, () => Array(m).fill("_")));
    this.destination = this.generateRandomDestination();
    this.players = [];
    this.gameBoard[this.destination.x][this.destination.y] = "X";
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

  addPlayer(player) {
    player.spawnPlayerAtEmptyPlace(this.rows, this.cols, this.gameBoard);
    this.players.push(player);
    this.gameBoard[player.x][player.y] = player.playerId;
  }

  isCollided() {
    //basically this function is creating the map of all the cordionaes of player current pos and putting
    //  the player in array and checking if the allpositions map of value has more than 1

    const allpositonsMap = new Map();
    let collisionHappend = false;

    for (let p of this.players) {
      if (p.collided) {
        return true;
      }
    }
    this.players.forEach((p) => {
      const playerPos = `${p.x},${p.y}`;

      if (!allpositonsMap.has(playerPos)) {
        allpositonsMap.set(playerPos, []);
      }

      allpositonsMap.get(playerPos).push(p);
    });

    allpositonsMap.forEach((p) => {
      if (p.length > 1) {
        if (!collisionHappend) {
     console.log(`two player ended up at same pos`);
          collisionHappend = true;
        }
      p.forEach((plyr) => {
        plyr.collided = true;
        //i can remvoe from the grid also
        this.gameBoard[plyr.x][plyr.y] = "_";
      }); 
    }
    });

    return collisionHappend;
  }

  start() {
    this.turn++;

    this.logs();

    this.players.forEach((p) => {
      p.nextMove(this.gameBoard, this.destination);
    });

    if (this.checkWin()) {
      console.log(`
        Game ${this.gameId} over !  
        `);
      return;
    }

    if (this.isCollided()){
      console.log(`
        Game ${this.gameId} over !  
        `);
      return;
    }

    this.showBoard();

    setTimeout(() => {
      this.start();
    }, 5000);
  }

  checkWin() {
    let winner = "";
    for (let p of this.players) {
      if (this.destination.x === p.x && this.destination.y === p.y) {
        winner = p.playerId;
        break;
      }
    }
    if (winner) {
      this.showBoard();
      console.log(` Winner found of game ${this.gameId}  winner is `, winner);
      return true;
    }

    return false;
  }

  logs() {
    console.log(`Game ${"0" + this.gameId} turn ${this.turn}\n`);

    console.log(`Game destination ${JSON.stringify(this.destination)}\n`);

  }

  showBoard() {
    for (let i = 0; i < this.rows; i++) {
      let show = "";
      for (let j = 0; j < this.cols; j++) {
        show += this.gameBoard[i][j] + "  ";
      }
      console.log(show);
    }
    console.log("\n");
  }
}
