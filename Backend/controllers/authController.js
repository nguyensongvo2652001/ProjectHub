const User = require("../models/userModel");

const { filterObject } = require("../utils/helpers");

const signUp = async (req, res, next) => {
  //1. Sanitize user input
  const userInput = filterObject(req.body, {
    whiteList: ["email", "password", "jobTitle", "name"],
  });
  console.log(userInput);

  //2. Create the user
  const user = await User.create(userInput);

  //3. Hash the password (using document middleware)

  //4. Create JWT and send it back to the client.

  res.status(201).json({
    status: "success",
    user,
  });
};

module.exports = { signUp };
