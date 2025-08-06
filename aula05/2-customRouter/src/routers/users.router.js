const Router = require("./router");

class UsersRouter extends Router {
  init() {
    // inicialização das rotas - equivalente a router.get
    // this.get("/", (req, res) => {
    //   res.send("Olá Coders! Esse é um custom router");
    // });

    // this.get("/", (req, res) => {
    //   res.send({ message: "Olá Coders! Esse é um custom router" });
    // });

    this.get("/", (req, res) => {
      res.sendSuccess("Olá Coders! Esse é um custom router");
    });
  }
};

module.exports = UsersRouter
