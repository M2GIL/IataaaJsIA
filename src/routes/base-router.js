const Router = require('express').Router;

class BaseRouter {

  constructor() {
    this.router = Router();
    this._init();
  }

  /* Main access point */
  getAll(req, res, next) {
    res.send({ message: 'Hello from BaseRouter' });
  }

  _init() {
    this.router.get('/', this.getAll);
  }
  
}

const baseRoutes = new BaseRouter();

module.exports.class = BaseRouter;
module.exports.routes = baseRoutes.router;
