const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/profile", userController.profileController);
router.put("/profile", userController.updateProfileController);

module.exports = router;