const express = require("express");
const router = express.Router();
const { login } = require("../../controllers/authController");
const authMiddleware = require("../../Middleware/authMiddleware");
const logoutController = require("../../controllers/logoutController");

router.post("/login", login);
router.post("/logout", authMiddleware, logoutController);

module.exports = router;
