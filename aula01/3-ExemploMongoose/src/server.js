const app = require("./app")

const port = 8080;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});