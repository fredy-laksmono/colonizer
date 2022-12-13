const Router = require("express").Router();
const AuthRouter = require("./AuthRouter");
const UniqueRouter = require("./UniqueRouter");

module.exports = Router;
Router.use("/auth", AuthRouter);
Router.use("/uniques", UniqueRouter);
