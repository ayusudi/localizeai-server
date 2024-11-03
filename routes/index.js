const router = require("express").Router();
const cafes = require("./cafes");
const posts = require("./posts");
const users = require("./users");

router.use("/cafes", cafes);
router.use("/posts", posts);
router.use("/users", users);

module.exports = router;
