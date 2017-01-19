const uuid = require('node-uuid');
const log  = require('debug')('iataaa:ai-service');

// Models
const Case          = require('../models/case');
const StatusService = require('../models/status-service');
const CodeEndGame   = require('../models/code-end-game');
const GameLevel     = require('../models/game-level');

// Our custom imlementation of AI
const AIThinker = require('../services/ai-thinker');

// Only for tests
// This token should be read from env vars
// or through a config file.
let TOKEN_ID;
try {
  TOKEN_ID = require('../token.json').token;
} catch(err) {
  log(`ERROR: ${err.message}`);
  process.exit(-1);
}
log(`Found token [${TOKEN_ID}].`);

class AIService {

  constructor() {
    this.tokenID = "";
    this.ais = [];
    this.isInGame = false;
    this.tokenID = TOKEN_ID;
  }

  /**
   * Return the current status of the IA
   * @param {string} token A token to verify service identity
   */
  getStatus(token) {
    if (this.tokenID !== token) {
      return null;
    }
    let st = this.isInGame ? StatusService.BUSY : StatusService.AVAILABLE;
    return { token: this.tokenID, status: st };    
  }

  /**
   * Start a game; status become BUSY.
   * { token, difficulty, player } => Request
   * { token, status, game_id } => Response
   * @param {string} token      A token to verify service identity
   * @param {string} difficulty AI difficulty
   * @param {number} player     Player who is playing
   * @returns {object}
   */
  startGame(token, difficulty, player) {
    if (token !== this.tokenID || !difficulty || !player ) {
      return null;
    }

    let status;
    let gameID;
    if (!this.isInGame) {
      gameID = uuid.v4();
      let thinker = new AIThinker(gameID);
      this.ais[gameID] = thinker;
      this.isInGame = true;
      status = StatusService.AVAILABLE;
      thinker.startGame(difficulty, player);
    } else {
      status = StatusService.BUSY;
    }

    return { 
      token:   this.tokenID,
      status:  status,
      game_id: gameID
    };
  }

  /**
   * Play a move on a selected game.
   * @param {string}    gameID     A game identifier
   * @param {string}    token      A token to verify service identity
   * @param {GameLevel} difficulty AI difficulty
   * @param {Player}    player     Player who is player
   * @param {array}     board      Current state of the game
   * 
   * @return {object}
   */
  play(gameID, token, difficulty, player, board) {
    log(`play(${gameID}, ${token}, ${difficulty}, ${player}, ${board})`);
    if (token !== this.tokenID || !difficulty || !player || !board) {
      return null;
    }
    let thinker = this.ais[gameID];
    if (!thinker) {
      return null;
    }
    
    // Il faudra transformer le tableau board en Array<Case>
    let caseBoard = Case.toCaseBoard(board);
    let movements = thinker.play(difficulty, player, caseBoard);
    
    return { 
      token:      token,
      difficulty: difficulty,
      player:     player,
      board:      Case.toCharBoard(movements)
    };
  }

  /**
   * End a started game.
   * Request  { token, winner, code } 
   * Response { token, status }
   * @param {string} gameID
   * @param {string} token
   * @param {number} winner
   * @param {code}   code
   * 
   * @return {object}
   */
  endGame(gameID, token, winner, code) {
    if (token !== this.tokenID) {
      return null;
    }

    const thinker = this.ais[gameID];
    if (!thinker) {
      return null;
    }

    thinker.endGame(winner, code);
    this.isInGame = false;

    const status = StatusService.AVAILABLE;

    return { 
      token:  token,
      status: status
    };
  }

}

module.exports = new AIService();