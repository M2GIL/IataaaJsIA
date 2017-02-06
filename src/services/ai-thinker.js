const log = require('debug')('iataaa:ai-thinker');

const Case = require('../models/case');
const CodeEndGame = require('../models/code-end-game');
const GameLevel = require('../models/game-level');

const AIOwn = require('./ai-own');

class AIThinker {

  constructor(id) {
    this.id = id;
    this.ai = null;
    log(`AIThinker created [${this.id}]`);
  }

  /**
   * Start a new game
   * @param {GameLevel} difficulty Game level
   * @param {Player} player Player number
   */
  startGame(difficulty, player) {
    log(`New game started with player ${player} and level ${difficulty} on [${this.id}]`);
    if (player === 2) {
      player = 3;
    }
    this.ai = new AIOwn(player, 0, false);
  }

  /**
   * Method used to play a move.
   * @param {GameLevel} difficulty Level of the game
   * @param {Player}    player     Current player
   * @param {Case[][]}  board      Current state of the game.
   * 
   * @returns {Case[][]}
   */
  play(difficulty, player, board) {
    log(`New move by player ${player} and level ${difficulty} on [${this.id}]`);

    this.ai.setBoard(Case.toNumberBoard(board));
    this.ai.buildGraph();

    let newBoard = this.ai.takeAdecision();
    return Case.numberToCaseBoard(newBoard);
  }

  /**
   * Signal to the IA that the game is ended.
   */
  endGame(winner, code) {
    log(`Game ended (${code}) ! Winner is ${winner} on [${this.id}]`);
    this.ai = null;
  }
}

module.exports = AIThinker;