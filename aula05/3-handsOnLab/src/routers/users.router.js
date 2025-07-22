const Router = require("./router");
const jwt = require("jsonwebtoken");

class GeralRouter extends Router {
  init() {
    this.get("/currentUser", ["USER", "USER_PREMIUM", "ADMIN"], (req, res) => {
      if (req.user.role.toUpperCase() === "ADMIN") return res.sendSuccess("Eu sou ADMIN");
      else if (req.user.role.toUpperCase() === "USER_PREMIUM") return res.sendSuccess("Eu sou USER_PREMIUM");
      return res.sendSuccess("Eu sou USER comum");
    });

    this.get("/", ["PUBLIC"], (req, res) => {
      return res.sendSuccess("Olá, Coders!");
    });
  }
}

module.exports = GeralRouter;


