const User = require("../models/userModel");

const { filterObject, createJsonWebToken } = require("../utils/helpers");

const createAndSendToken = async (args) => {
  const { user, statusCode, req, res } = args;

  const token = await createJsonWebToken(user);

  // Hide sensitive fields
  user.password = undefined;

  res.cookie("jwt", token, {
    maxAge:
      Number(process.env.JWT_COOKIE_EXPIRES_IN) *
      Number(process.env.DAY_SECONDS) *
      1000,
    httpOnly: true,
    // Encrypt the cookie only if the request is secured or if the host is https
    secure: req.secure || req.header("x-forwarded-proto") === "https",
  });

  res.status(statusCode).json({
    status: "success",
    data: {
      user,
      token,
    },
  });
};

const signUp = async (req, res, next) => {
  //1. Sanitize user input
  const userInput = filterObject(req.body, {
    whiteList: ["email", "password", "jobTitle", "name"],
  });

  //2. Create the user
  const user = await User.create(userInput);

  //3. Hash the password (using user document middleware) BEFORE saving the user to the database

  //4. Create JWT and send it back to the client.
  createAndSendToken({ user, req, res, statusCode: 201 });
};

module.exports = { signUp };
