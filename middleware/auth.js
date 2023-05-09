const jwt = require("jsonwebtoken");
const StatusCodes = require("http-status");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("JWT ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(StatusCodes.UNAUTHORIZED).send({ error: "Please authorize!" });
  }
};

module.exports = auth;
