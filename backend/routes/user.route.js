const express = require("express");
const router = express.Router();
const {
  testController,
  updateUser,
} = require("../controllers/user.controller");
const { verifyUserToken } = require("../middlewares/verifyUserToken");
const upload = require("../middlewares/multer.middleware");

router.get("", testController);
router.put("/update/:id", verifyUserToken, upload.single("avatar"), updateUser);

module.exports = router;
