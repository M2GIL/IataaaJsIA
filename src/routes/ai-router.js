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
        { path: '/status',         method: 'postStatus' },
        { path: '/games/start',    method: 'startGame'  },
        { path: '/games/play/:id', method: 'play'       },
        { path: '/games/end/:id',  method: 'endGame'    }
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
    return res.sendStatus(500);
  }

  /**
   * Main method; called for each
   * move. Send a next move to the
   * platform.
   */
  play(req, res, next) {
    log(`Play id: ${req.params.id}`);
    return res.sendStatus(500);    
  }

  /**
   * Used to tell that we are now availabe for a new game.
   */
  endGame(req, res, next) {
    log(`EndGame id: ${req.params.id}`);
    return res.sendStatus(500);
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
