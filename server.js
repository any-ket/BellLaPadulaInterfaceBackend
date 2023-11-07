const express = require("express");
const session = require("express-session");
const logger = require("logger");
const bodyParser = require('body-parser');
const app = express();
const PORT = 9099;
const cors = require('cors');

const { InitialiseSqlClients } = require("./dal/dbClient");

app.use(cors({
  origin: '*',
  credentials: true,
  sameSite: "none"
}));
app.use(bodyParser.json());
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
