const UserController = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", UserController.login);
// router.post("/verify", UserController.login);
router.get("/:username", UserController.findOneByUsername);
router.patch("/:username", UserController.setUsername);
router.get("/mutual", (req, res) => res.send("Welcome to Server"));
router.post("/mutual", (req, res) => res.send("Welcome to Server"));

module.exports = router;
