const Product = require("../models/productModel");
const StatusCodes = require("http-status");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(StatusCodes.OK).send(products);
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "Unable to fetch product" });
  }
};

exports.getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    //console.log('fffffff',product);
    if (product) res.status(StatusCodes.OK).send(product);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "Product not found" });
  }
};
