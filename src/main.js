import Game from './game.js';
// import Player from './player';

const game1 = Game.create(3, 4);
const game2 = Game.create(4, 4);

// const playerA = Player.create();
// const playerB = Player.create();
// const playerC = Player.create();
// const playerD = Player.create();

// game1.addPlayer(playerA);
// game1.addPlayer(playerB);
// game2.addPlayer(playerC);
// game2.addPlayer(playerD);

game1.start();
game2.start();

/* CLI output:

Game 01 Turn 001:

A _ _ _
_ B _ X
_ _ _ _


Game 02 Turn 001:

_ _ _ _
_ _ C _
X _ _ _
_ _ _ D


< After 5s >

Game 01 Turn 002:

_ _ _ _
_ A B X
_ _ _ _


Game 02 Turn 002:

_ _ _ _
_ _ _ _
X _ C _
_ _ D _

...
*/