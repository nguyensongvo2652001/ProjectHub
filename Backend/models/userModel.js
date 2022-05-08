const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Email is invalid"],
    trim: true,
    unique: [true, "Email must be unique"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    maxlength: [50, "Your name is too long"],
    trim: true,
  },
  jobTitle: {
    type: String,
    required: [true, "Job title is required"],
    maxlength: [50, "Job title is too long"],
    trim: true,
  },
  description: {
    type: String,
    maxlength: [160, "Description is too long"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: function (val) {
        //Password must be at least 10 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character
        return val.match(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/
        );
      },
      message:
        "Your password is not strong enough. Password must contain at least 10 characters, one uppercase letter, one lowercase letter, one number and one special character",
    },
    select: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
