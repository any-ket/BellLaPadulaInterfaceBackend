const express = require("express");
const indexRouter = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");

indexRouter.use("/auth", authRouter);
indexRouter.use("/user", userRouter);

module.exports = indexRouter;