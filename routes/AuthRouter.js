const router = require("express").Router();
const controller = require("../controllers/AuthController");
const middleware = require("../middleware");

router.post("/login", controller.Login);
router.post("/register", controller.Register);
router.put(
  "/userinfo",
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePassword
);

router.get("/", (req, res) => res.json({ message: "Auth Works" }));

module.exports = router;
