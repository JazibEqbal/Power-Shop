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
    res.status(StatusCodes.BAD_REQUEST).send({ message: "Invalid Credentials!" });
  }
};
