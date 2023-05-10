const express = require("express");
const router = express.Router();
const {
  saveTocart,
  addOneToCart,
  removeFromCart,
  getCart,
  saveOrderDetails,
} = require("../controllers/cartControllers");
const auth = require("../middleware/auth");

router.route("/cart/save").post(auth, saveTocart);
router.route("/cart/get").get(auth, getCart);
router.route("/cart/remove").delete(auth, removeFromCart);
router.route("/cart/add-one").post(auth, addOneToCart);
router.route("/shipping/save").post(auth, saveOrderDetails);
module.exports = router;
