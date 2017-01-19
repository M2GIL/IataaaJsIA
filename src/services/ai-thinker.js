const log = require('debug')('iataaa:ai-thinker');

const Case = require('../models/case');
const CodeEndGame   = require('../models/code-end-game');
const GameLevel     = require('../models/game-level');

class AIThinker {

  constructor(id) {
    this.id = id;
    log(`AIThinker created [${this.id}]`);
  }

  /**
   * Start a new game
   * @param {GameLevel} difficulty Game level
   * @param {Player} player Player number
   */
  startGame(difficulty, player) {
    log(`New game started with player ${player} and level ${difficulty} on [${this.id}]`);
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

    const tab = [
      [ 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 ],
      [ 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 3, 0, 3, 0, 3, 0, 3, 0, 3 ],
      [ 3, 0, 3, 0, 3, 0, 3, 0, 3, 0 ],
      [ 0, 3, 0, 3, 0, 3, 0, 3, 0, 3 ],
      [ 3, 0, 3, 0, 3, 0, 3, 0, 3, 0 ],
    ];

    return Case.toCaseBoard(tab);

  }

  /**
   * Signal to the IA that the game is ended.
   */
  endGame(winner, code) {
    log(`Game ended (${code}) ! Winner is ${winner} on [${this.id}]`);
  }

}

module.exports = AIThinker;