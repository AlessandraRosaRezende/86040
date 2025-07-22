const express = require("express");
const UsersRouter = require("./routers/users.router");
const SessionRouter = require("./routers/session.router");

const app = express();
app.use(express.json());

const usersRouter = new UsersRouter();
const sessionRouter = new SessionRouter()

app.use("/users", usersRouter.getRouter());
app.use("/session", sessionRouter.getRouter());

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});