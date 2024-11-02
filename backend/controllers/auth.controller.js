const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");

//Get Username,email,password
//Check if user already exists
//If exists return userAlready exists
//if not create a new user
//Return user

//TODO -> Add JWT TOKEN

module.exports.signUpController = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already Exists!" });
  }

  const newUser = await User.create({
    username,
    email,
    password,
  });

  if (!newUser) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }

  return res.status(201).json({
    message: "New User Created",
    username: newUser.username,
    email: newUser.email,
  });
});

//Get email,password;
//If neither email nor password is given return error; use or
//find the user based on email;
//check whether the user password == the password in our database;
//If not return error;
//If yes return response welcome and redirect to home page;

//TODO -> Add JWT Functionality and cookies
// module.exports.SignInUserController;
