const mongoose = require("mongoose");
const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require("bcrypt");
const uploadOnCloudinary = require("../utils/cloudinary");

module.exports.testController = asyncHandler(async (req, res) => {
  return res.json({
    message: "Hello World!",
  });
});

module.exports.updateUser = asyncHandler(async (req, res) => {
  // Check if the user making the request is authorized
  if (req.user.id !== req.params.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check if the email is already in use by another user
  if (req.body.email) {
    const emailUser = await User.findOne({ email: req.body.email });
    if (emailUser && emailUser._id.toString() !== req.params.id) {
      return res
        .status(400)
        .json({ message: "Email already in use by another account" });
    }
  }

  // Check if the username is already in use by another user
  if (req.body.username) {
    const usernameUser = await User.findOne({ username: req.body.username });
    if (usernameUser && usernameUser._id.toString() !== req.params.id) {
      return res
        .status(400)
        .json({ message: "Username already in use by another account" });
    }
  }

  // Hash the password if it's being updated
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  const updateFields = {};
  if (req.body.username) updateFields.username = req.body.username;
  if (req.body.email) updateFields.email = req.body.email;
  if (req.body.password) updateFields.password = req.body.password;

  if (req.file) {
    const avatarLocalPath = req.file?.path;
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    updateFields.avatar = avatar?.url;
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: updateFields },
    { new: true }
  );

  // Remove the password field from the response
  const { password, ...rest } = updatedUser._doc;

  res.status(200).json({
    message: "User updated successfully",
    user: rest,
  });
});
