const express = require("express");
const {
  registerUser,
  logInuser,
  getAdmin,
  createProductAdmin,
  getAllUserAdmin,
  getAllOrdersForAUser,
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const router = express.Router();

router.route("/user/register").post(registerUser);
router.route("/user/login").post(logInuser);
router.route("/user/admin").get(auth, getAdmin);
router.route("/user/all").get(auth, getAllUserAdmin);
router.route("/user/admin/create/product").post(auth, createProductAdmin);
router.route("/user/admin/get/all/orders/:id").get(auth, getAllOrdersForAUser);

module.exports = router;
