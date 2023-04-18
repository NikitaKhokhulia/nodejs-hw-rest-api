const express = require("express");
const router = express.Router();
const authMiddleware = require("../../Middleware/authMiddleware");
const avatarUpload = require("../../Middleware/uploadMiddleware");
const {
  registerUser,
  updateAvatar,
} = require("../../controllers/usersController");

router.post("/register", registerUser);
router.get("/current", authMiddleware, (req, res) => {
  res.json({ email: req.user.email, subscription: req.user.subscription });
});
router.patch(
  "/avatars",
  authMiddleware,
  avatarUpload.single("avatar"),
  updateAvatar
);

module.exports = router;
