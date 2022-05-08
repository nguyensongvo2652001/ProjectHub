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

const login = async (req, res, next) => {
  //1. Get the email and password
  const { email, password } = req.body;
  //2. Check if email or password is empty
  if (!email || !password) {
    //Handle error here
  }
  //3. Find the account with the specified email
  const user = await User.findOne({ email }).select("+password");
  //4. Verify password
  const correctCredentials =
    user && (await user.verifyPassword(password, user.password));

  if (!correctCredentials) {
    //Handle error here
  }

  //5. Create and send back JWT if successful
  createAndSendToken({ req, res, user, statusCode: 200 });
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

module.exports = { signUp, login };
