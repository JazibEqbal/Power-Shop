const express = require("express");
const { registerUser, logInuser } = require("../controllers/userController");
const router = express.Router();

router.route("/user/register").post(registerUser);
router.route("/user/login").post(logInuser);

module.exports = router;
