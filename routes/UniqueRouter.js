const router = require("express").Router();
const controller = require("../controllers/UniqueController");

router.post(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateUnique
);
