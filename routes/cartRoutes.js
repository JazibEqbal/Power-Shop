const express = require("express");
const router = express.Router();
const Cart = require("../models/cartModel");
const StatusCodes = require("http-status");

router.post("/cart/save", async (req, res) => {
  try {
    let cart = await Cart.findOne({ productId: req.body.productId});
    if(cart) {
      cart.quantity += req.body.quantity; 
      await cart.save();
    }
    else {
      cart = new Cart(req.body);
      await cart.save();
    }
    res.status(StatusCodes.CREATED).send({
      status: "Added to cart",
      data: {
        cart,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).send({
      status: "Not added to cart",
      error: err,
    });
  }
});

router.get("/cart/save", async (req, res) => {
  try {
    const cart = await Cart.find({});
    res.status(StatusCodes.OK).send(cart);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "Product not found" });
  }
});

module.exports = router;
