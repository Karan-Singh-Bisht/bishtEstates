const express = require("express");
const router = express.Router();
const { signUpController } = require("../controllers/auth.controller");

router.post("/signUp", signUpController);

module.exports = router;
