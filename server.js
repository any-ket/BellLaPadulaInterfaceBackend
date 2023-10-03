const express = require("express");
const session = require("express-session");
const logger = require("logger");
const app = express();
const PORT = 9099;

const { InitialiseSqlClients } = require("./dal/dbClient");

app.use(session({
  secret: "SECRET",
  resave: false,
  saveUninitialized: true,
}));

app.use(require("./httpl"));

InitialiseSqlClients().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server is running at http://localhost:${PORT}`);
  });
});
