const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');

// Routers
const BaseRouter = require('./routes/base-router');
const AIRouter = require('./routes/ai-router');

// Config
// -- TODO --

class App {

  /**
   * Initialize the app.
   */
  constructor() {
    this.express = express();
    this._middleware();
    this._routes();
  }

  // Configure les middlewares utilisés dans express
  /**
   * configure used middlewares for express
   * logger : for dev purpose
   * helmet : secure http requests
   * bodyParser : parse the http body part into a readable json object
   */
  _middleware() {
    this.express.use(logger('dev'));
    this.express.use(helmet());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure l'ensemble des endpoints
  _routes() {
    let router = express.Router();
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello world!'
      });
    });
    this.express.use('/', router);
    this.express.use('/api/v1', BaseRouter.routes);
    this.express.use('/api/v1/ai', AIRouter.routes);
  }
}

module.exports = new App().express;
