const router = require("express").Router();
const controller = require("../controllers/UniqueController");
const middleware = require("../middleware");

router.post(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateUnique
);

router.get(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetUnique
);

module.exports = router;
