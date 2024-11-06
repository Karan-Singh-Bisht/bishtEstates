const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uploadOnCloudinary = require("../utils/cloudinary");

//Get Username,email,password
//Check if user already exists
//If exists return userAlready exists
//if not create a new user
//Return user

module.exports.signUpController = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already Exists!" });
  }

  const avatarLocalPath = req.file?.path;

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const newUser = await User.create({
    username,
    email,
    password,
    avatar: avatar?.url,
  });

  if (!newUser) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }

  return res.status(201).json({
    message: "New User Created",
    username: newUser.username,
    email: newUser.email,
    avatar: newUser.avatar,
  });
});

//Get email,password;
//If neither email nor password is given return error; use or
//find the user based on email;
//check whether the user password == the password in our database;
//If not return error;
//If yes return response welcome and redirect to home page;

module.exports.SignInUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password!" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Password" });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  const { password: pass, ...rest } = user._doc;
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  return res.json({
    message: `Welcome ${user.username}!!`,
    user: rest,
  });
});

module.exports.googleController = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = user._doc;
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({
      message: `Welcome ${user.username}!!`,
      user: rest,
    });
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
    const newUser = await User.create({
      username: req.body.name + Math.random().toString(36).slice(-4),
      email: req.body.email,
      password: hashedPassword,
      avatar: req.body.photo,
    });
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = newUser._doc;
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({
      message: `Welcome ${newUser.username}!!`,
      user: rest,
    });
  }
});
