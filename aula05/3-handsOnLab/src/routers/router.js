const express = require("express");
const jwt = require("jsonwebtoken");

class Router {
  constructor() {
    this.router = express.Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() { }

  applyCallback(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        console.error(error);
        params[1].status(500).send(error);
      }
    });
  }

  handlePolices = (policies) => (req, res, next) => {
    // qualquer um acessa
    if (policies[0] === "PUBLIC") return next();
    
    const authHeaders = req.headers.authorization;
    console.log(authHeaders);

    if (!authHeaders) return res.status(401).send({ status: "error", erro: "Unauthorized" });

    const token = authHeaders.split(" ")[1];
    // pega user do token
    let user = jwt.verify(token, "CoderSecret");
    console.log(user);
    
    // se a função do usuário não está no array de políticas, não acessa
    if (policies && !policies.includes(user.role.toUpperCase())) return res.status(400).send({ status: "error", erro: "sem acesso" });
    
    req.user = user;
    next();
  };


  generateCustomResponses = (req, res, next) => {
    res.sendSuccess = (payload) => res.status(201).json({ status: "success", payload });
    res.sendServerError = (error) => res.status(500).json({ status: "error", error });
    res.sendoUserError = (error) => res.status(400).json({ status: "error", error });
    next();
  };

  get(path, polices, ...callbacks) {
    this.router.get(path, this.handlePolices(polices), this.generateCustomResponses, this.applyCallback(callbacks));
  }

  post(path, polices, ...callbacks) {
    this.router.post(path, this.handlePolices(polices), this.generateCustomResponses, this.applyCallback(callbacks));
  }

  put(path, polices, ...callbacks) {
    this.router.post(path, this.handlePolices(polices), this.generateCustomResponses, this.applyCallback(callbacks));
  }

  delete(path,polices, ...callbacks) {
    this.router.post(path, this.handlePolices(polices), this.generateCustomResponses, this.applyCallback(callbacks));
  }
}

module.exports = Router;