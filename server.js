const express = require("express");
const session = require("express-session");
const logger = require("logger");
const app = express();
const PORT = 9099;

const IndexRouter = require("./httpl");
const { InitialiseSqlClients } = require("./dal/dbClient");

app.use(session({
  secret: config.SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(IndexRouter);

InitialiseSqlClients().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server is running at http://localhost:${PORT}`);
  });
});