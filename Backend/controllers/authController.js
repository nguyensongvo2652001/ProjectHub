const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

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

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    //Handle error here
  }

  const user = await User.findOne({ email }).select("+password");

  const correctCredentials =
    user && (await user.verifyPassword(password, user.password));

  if (!correctCredentials) {
    //Handle error here
  }

  createAndSendToken({ req, res, user, statusCode: 200 });
});

const signUp = catchAsync(async (req, res, next) => {
  //Sanitize user input
  const userInput = filterObject(req.body, {
    whiteList: ["email", "password", "jobTitle", "name"],
  });

  const user = await User.create(userInput);

  //Hash the password (using user document middleware) BEFORE saving the user to the database

  createAndSendToken({ user, req, res, statusCode: 201 });
});

module.exports = { signUp, login };
