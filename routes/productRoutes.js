const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getOneProduct,
} = require("../controllers/productControllers");

router.route("/products").get(getAllProducts);
router.route("/products/:id").get(getOneProduct);

module.exports = router;
