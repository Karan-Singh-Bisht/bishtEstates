const express = require("express");
const router = express.Router();
const { testController } = require("../controllers/user.controller");

router.get("", testController);

module.exports = router;
