const express = require("express");
const router = express.Router();
const {
  signUpController,
  SignInUserController,
  googleController,
} = require("../controllers/auth.controller");

router.post("/signUp", signUpController);
router.post("/signIn", SignInUserController);
router.post("/google", googleController);

module.exports = router;
