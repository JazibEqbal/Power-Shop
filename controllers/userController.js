const Product = require("../models/productModel");
const User = require("../models/userModel");
const StatusCodes = require("http-status");

exports.registerUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(StatusCodes.CREATED).send({
      user,
      token,
      message: "Registration Success!",
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "Cannot Register!" });
  }
};

exports.logInuser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(StatusCodes.CREATED).send({
      user,
      token,
      message: "Login Success!",
    });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "Invalid Credentials!" });
  }
};
exports.getUser = async () => {
  try {
    const user = await Product.findById({ _id: req.user._id });
    res.status(StatusCodes.FOUND).send(user);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "User not found" });
  }
};

exports.getAdmin = async (req, res) => {
  try {
    const admin = await User.findOne({ _id: req.user._id, isAdmin: true });
    if (admin) {
      res.status(StatusCodes.OK).send(true);
    } else {
      res.status(StatusCodes.NOT_FOUND).send("Not a admin");
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "No Admin Found" });
  }
};

exports.createProductAdmin = async (req, res) => {
  try {
    const product = new Product({ ...req.body, user: req.user._id });
    await product.save();
    res.status(StatusCodes.CREATED).send(product);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "Cannot Post" });
  }
};
