const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const StatusCodes = require("http-status");

router.get("/v1/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(StatusCodes.OK).send(products);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({
      status: "Unable to fetch Product",
      error: e,
    });
  }
});

router.get("/v1/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.status(StatusCodes.OK).send(product);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "Product not found" });
  }
});

module.exports = router;
