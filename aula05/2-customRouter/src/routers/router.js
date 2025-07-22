const express = require("express");

class Router {
  constructor() {
    this.router = express.Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() { }

  get(path, ...callbacks) {
    this.router.get(path, this.applyCallback(callbacks));
  }

  applyCallback(callbacks) {
    // mapeia os callbacks um a um, obtendo seus parâmetros
    return callbacks.map((callback) => async (...params) => {
      try {
        // o apply vai executar a função callback apontando para uma instância da classe (this - vai ser executado somente no contexto deste router). A função callback recebe req, res e next
        await callback.apply(this, params);
      } catch (error) {
        console.error(error);
        // params[1] referencia res
        params[1].status(500).send(error);
      }
    });
  }
}

module.exports = Router;