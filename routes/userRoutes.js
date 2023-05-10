const express = require("express");
const {
  registerUser,
  logInuser,
  getAdmin,
  getUser,
  createProductAdmin,
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const router = express.Router();

router.route("/user/register").post(registerUser);
router.route("/user/login").post(logInuser);
router.route("/user/profile").get(getUser);
router.route("/user/admin").get(auth, getAdmin);
router.route("/user/admin/create/product").post(auth, createProductAdmin);

module.exports = router;
