const mongoose = require("mongoose");
const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");

module.exports.testController = asyncHandler(async (req, res) => {
  return res.json({
    message: "Hello World!",
  });
});
