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

  generateCustomResponses = (req, res, next) => {
    res.sendSuccess = (payload) => res.status(200).json({ status: "success", payload });
    res.sendSuccessCreated = (payload) => res.status(201).json({ status: "created", payload });
    res.sendServerError = (error) => res.status(500).json({ status: "error", error });
    res.sendoUserError = (error) => res.status(400).json({ status: "error", error });
    next();
  };

  get(path, ...callbacks) {
    this.router.get(path, this.generateCustomResponses, this.applyCallback(callbacks));
  }

  post(path, ...callbacks) {
    this.router.post(path, this.generateCustomResponses, this.applyCallback(callbacks));
  }

  put(path, ...callbacks) {
    this.router.post(path, this.generateCustomResponses, this.applyCallback(callbacks));
  }

  delete(path, ...callbacks) {
    this.router.post(path, this.generateCustomResponses, this.applyCallback(callbacks));
  }
}

module.exports = Router;