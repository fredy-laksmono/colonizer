const Router = require("express").Router();
const AuthRouter = require("./AuthRouter");
const UniqueRouter = require("./UniqueRouter");
const RaceRouter = require("./RaceRouter");

module.exports = Router;
Router.use("/auth", AuthRouter);
Router.use("/uniques", UniqueRouter);
Router.use("/races", RaceRouter);
