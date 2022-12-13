const router = require("express").Router();
const controller = require("../controllers/RaceController");
const middleware = require("../middleware");

router.post(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateRace
);

router.get(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetUserRaces
);

router.get(
  "/single/:id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetRace
);

router.delete(
  "/:id/",
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteRace
);

router.put(
  "/:id/",
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateRace
);

module.exports = router;
