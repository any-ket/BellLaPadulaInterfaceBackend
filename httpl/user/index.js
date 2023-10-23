const express = require("express");
const CreateAPI = require("../apiBuilder");

const Bl = require("../../bl/user");

const Router = express.Router();

const APIS = [
  {
    endpoint: "/object",
    method: "put",
    blFunction: Bl.CreateObject,
    shouldItBeAuthorized: true,
  },
  {
    endpoint: "/grantObjectAccess",
    method: "post",
    blFunction: Bl.GrantObjectAccess,
    shouldItBeAuthorized: true,
  },
  {
    endpoint: "/object",
    method: "get",
    blFunction: Bl.GetObject,
    shouldItBeAuthorized: true,
  }
];


CreateAPI(Router, APIS);

module.exports = Router;