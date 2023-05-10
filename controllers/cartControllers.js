const Cart = require("../models/cartModel");
const StatusCodes = require("http-status");

exports.saveTocart = async (req, res) => {
  try {
    console.log('first',req.body);
    let cart = await Cart.findOne({
      productId: req.body.productId,
      user: req.user._id,
    });
    if (cart) {
      cart.quantity += req.body.quantity;
      await cart.save();
    } else {
      cart = new Cart({ ...req.body, user: req.user._id });
      await cart.save();
    }
    res.status(StatusCodes.CREATED).send({
      status: "Added to cart",
      data: {
        cart,
      },
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "Not added to cart" });
  }
};

exports.saveOrderDetails = async (req, res) => {
  try {
    console.log(req.body);
    const order = await Cart.updateMany({
      user: req.user._id,
      isOrdered: false
    },{...req.body, isOrdered: true});
    res.status(StatusCodes.CREATED).send({
      order,
      message: "Order Success!",
    });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "Some error occured!" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user._id });
    res.status(StatusCodes.OK).send(cart);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "Cart is Empty" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ productId: req.body.productId });
    if (cart.quantity > 1) {
      cart.quantity -= 1;
      await cart.save();
    } else {
      cart = await Cart.findOneAndDelete({ productId: req.body.productId });
    }
    res.status(StatusCodes.CREATED).send({
      status: "Product removed",
      data: {
        cart,
      },
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "Cannot remove" });
  }
};

exports.addOneToCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ productId: req.body.productId });
    if (cart.quantity < cart.countInStock) {
      cart.quantity++;
      await cart.save();

      res.status(StatusCodes.OK).send({
        status: "One Product Added",
        data: {
          cart,
        },
      });
    } else {
      res.status(StatusCodes.OK).send({
        status: "Count in Stock Capacity Reached",
        data: {
          cart,
        },
      });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "Cannot add" });
  }
};
