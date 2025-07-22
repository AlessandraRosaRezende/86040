const Router = require("./router");

class UsersRouter extends Router {
  init() {
    // inicialização das rotas - equivalente a router.get
    this.get("/", (req, res) => {
      res.send("Olá Coders!");
    });
  }
};

module.exports = UsersRouter
