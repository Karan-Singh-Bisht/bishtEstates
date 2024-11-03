const express = require("express");
const router = express.Router();
const {
  signUpController,
  SignInUserController,
} = require("../controllers/auth.controller");

router.post("/signUp", signUpController);
router.post("/signIn", SignInUserController);

module.exports = router;
