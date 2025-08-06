const Router = require("./router");
const jwt = require("jsonwebtoken");

class SessionRouter extends Router {
  init() {
    this.post("/login", ["PUBLIC"], (req, res) => {
      // exemplo de usuário - atenção para a atribuição da role
      let user = {
        email: req.body.email,
        role: req.body.role,
      };

      let token = jwt.sign(user, 'CoderSecret')
      res.sendSuccess({ token });
    });
  }
}

module.exports = SessionRouter;


