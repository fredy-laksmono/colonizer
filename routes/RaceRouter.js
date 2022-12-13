const router = require("express").Router();
const controller = require("../controllers/RaceController");
const middleware = require("../middleware");

router.post(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateRace
);

module.exports = router;
