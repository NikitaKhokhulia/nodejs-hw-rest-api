const express = require("express");
const router = express.Router();
const { registerUser } = require("../../controllers/usersController");
const authMiddleware = require("../../Middleware/authMiddleware");
const currentUserController = require("../../controllers/currentUserController");

router.post("/register", registerUser);
router.get("/current", authMiddleware, currentUserController);

module.exports = router;
