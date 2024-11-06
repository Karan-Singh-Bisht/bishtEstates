const express = require("express");
const router = express.Router();
const {
  signUpController,
  SignInUserController,
  googleController,
} = require("../controllers/auth.controller");
const upload = require("../middlewares/multer.middleware");

router.post("/signUp", upload.single("avatar"), signUpController);
router.post("/signIn", SignInUserController);
router.post("/google", googleController);

module.exports = router;
