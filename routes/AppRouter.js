const Router = require("express").Router();
const AuthRouter = require("./AuthRouter");

module.exports = Router;
Router.use("/auth", AuthRouter);
