const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");
const users = require("./data/users");
//const products = require("./data/products");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    //await Product.deleteMany();
    //await Order.deleteMany();

    await User.insertMany(users);
    // const findAdmin = await User.findOne({ isAdmin: true });
    // const adminUser = findAdmin._id;

    // const sampleProducts = products.map((product) => {
    //   return { ...product, user: adminUser };
    // });
    // await Product.insertMany(sampleProducts);

    console.log("Data Imported");
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("Data Destroyed");
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
