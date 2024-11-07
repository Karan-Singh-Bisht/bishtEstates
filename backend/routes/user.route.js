const express = require("express");
const router = express.Router();
const {
  testController,
  updateUser,
} = require("../controllers/user.controller");
const { verifyUserToken } = require("../middlewares/verifyUserToken");

router.get("", testController);
router.post("/update/:id", verifyUserToken, updateUser);

module.exports = router;
