const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");

//Get Username,email,password
//Check if user already exists
//If exists return userAlready exists
//if not create a new user
//Return user

module.exports.signUpController = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.json({ message: "User Already Exists" });
  }

  const newUser = await User.create({
    username,
    email,
    password,
  });

  return res.status(201).json({
    message: "New User Created",
    username: newUser.username,
    email: newUser.email,
  });
});
