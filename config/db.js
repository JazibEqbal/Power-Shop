const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectDB = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("DB Connected");
  } catch (err) {
    console.log("Error", err);
    process.exit(1);
  }
};

module.exports = connectDB;
