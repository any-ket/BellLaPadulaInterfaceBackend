const express = require("express");
const CreateAPI = require("../apiBuilder");

const Bl = require("../../bl/auth");

const Router = express.Router();

const APIS = [
  {
    endpoint: "/signup",
    method: "post",
    blFunction: Bl.Signup
  },
  {
    endpoint: "/login",
    method: "post",
    blFunction: Bl.Login
  },
  {
    endpoint: "/isloggedin",
    method: "get",
    blFunction: Bl.IsLoggedIn
  }
];


CreateAPI(Router, APIS);

module.exports = Router;