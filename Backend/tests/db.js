const mongoose = require("mongoose");

const User = require("../models/userModel");

const connectToDatabase = async () => {
  const db = process.env.TEST_DB_STRING;
  await mongoose.connect(db);
};

const clearDatabase = async () => {
  await User.deleteMany();
};

const setUp = async () => {
  beforeAll(connectToDatabase);
  beforeEach(clearDatabase);
};

module.exports = { setUp };
