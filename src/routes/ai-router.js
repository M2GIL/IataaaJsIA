const Router = require('express').Router;
const aiService = require('../services/ai-service');

const log = require('debug')('iataaa-ai-router');

class AIRouter {

  /**
   * All AIRouter routes are defined here.
   * They follow the following schema:
   * {
   *   post: [
   *     { path: '/route', method: 'aMethodToCall' },
   *     { path: '...', method: '...' }
   *   ],
   *   get: [ ... ],
   *   put: [ ... ],
   *   delete: [ ... ]
   * }
   */
  constructor() {
    this.router = Router();
    this.routes = {
      post: [
        { path: '/status',              method: 'postStatus' },
        { path: '/games/start',         method: 'startGame'  },
        { path: '/games/play/:game_id', method: 'play'       },
        { path: '/games/end/:game_id',  method: 'endGame'    }
      ]
    };

    this._init();
  }

  /**
   * Return IA status (BUSY / AVAILABLE)
   */
  postStatus(req, res, next) {
    log("received token: " + req.body.token);
    let response = aiService.getStatus(req.body.token);
    if (!response) {
      // return an UNAUTHORIZED response
      return res.sendStatus(401);
    }
    return res.send(response);
  }

  /**
   * Used to tell that we start a new Game and
   * we are busy.
   */
  startGame(req, res, next) {
    let token      = req.body.token;
    let difficulty = req.body.difficulty;
    let player     = req.body.player;

    log(`Received play request [${token}, ${difficulty}, ${player}]`);
    
    let response = aiService.startGame(token, difficulty, player);
    if (!response) {
      return res.sendStatus(401);
    }
    return res.send(response);
  }

  /**
   * Main method; called for each
   * move. Send a next move to the
   * platform.
   */
  play(req, res, next) {
    const gameID = req.params.game_id;
    const token = req.body.token;
    const difficulty = req.body.difficulty;
    const player = req.body.player;
    const board = req.body.board;

    const response = aiService.play(
      gameID,
      token,
      difficulty,
      player,
      board
    );

    if (!response) {
      return res.sendStatus(401);
    }
    return res.send(response);
  }

  /**
   * Used to tell that the game is over and tell the winner.
   */
  endGame(req, res, next) {
    const gameID = req.params.game_id;
    const token = req.body.token;
    const winner = req.body.winner;
    const code = req.body.code;

    const response = aiService.endGame(gameID, token, winner, code);
    if (!response) {
      return res.sendStatus(401);
    }
    return res.send(response);
  }

  /**
   * This method should not be modified;
   * Registers routes and maps them to the corresponding
   * url.
   */
  _init() {
    for( let method in this.routes ) {
      this.routes[method].forEach( route => {
        this.router[method](route.path, this[route.method]);
      });
    }
  }
  
}

const aiRoutes = new AIRouter();

module.exports.class = AIRouter;
module.exports.routes = aiRoutes.router;
