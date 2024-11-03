const router = require("express").Router();

router.get("/", (req, res) => res.send("Welcome to Server"));
router.post("/", (req, res) => res.send("Welcome to Server"));
router.get("/:post_id", (req, res) => res.send("Welcome to Server"));

module.exports = router;
