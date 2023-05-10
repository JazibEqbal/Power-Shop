const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    delieveryName: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
      maxLength: 12,
      minLength: 10,
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    zipcode: {
      type: String,
      required: false,
    },
    paymentStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    paidAt: {
      type: Date,
      required: false,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    isOrdered: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.methods.toJSON = function () {
  const product = this;

  const userObject = product.toObject();
  delete userObject.user;

  return userObject;
};

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
