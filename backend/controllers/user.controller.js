const mongoose = require("mongoose");
const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require("bcrypt");

module.exports.testController = asyncHandler(async (req, res) => {
  return res.json({
    message: "Hello World!",
  });
});

module.exports.updateUser = asyncHandler(async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check if the email already exists with another user
  if (req.body.email) {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser && existingUser._id.toString() !== req.params.id) {
      return res
        .status(400)
        .json({ message: "Email already in use by another account" });
    }
  }

  //Check if the username already exists with another user
  if (req.body.username) {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser && existingUser._id.toString() !== req.params.id) {
      return res
        .status(400)
        .json({ message: "Username already in use by another account" });
    }
  }

  if (req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      },
    },
    { new: true }
  );
  const { password: pass, ...rest } = updatedUser._doc;
  res.status(200).json({
    message: "User updated successfully",
    user: rest,
  });
});
