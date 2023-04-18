const bcrypt = require("bcrypt");
const Joi = require("joi");
const User = require("../Models/userModel");
const gravatar = require("gravatar");
const jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs/promises");

const registrationSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
  avatarURL: Joi.string().allow(null).default(null),
});


const registerUser = async (req, res) => {
  try {
    const { error } = registrationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email in use",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);
    const user = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;
    const image = await jimp.read(file.path);
    await image.resize(250, 250);
    const filename = `${uuidv4()}.${file.originalname.split(".").pop()}`;
    await image.writeAsync(`public/avatars/${filename}`);
    await fs.unlink(file.path);

    const user = await User.findByIdAndUpdate(
      userId,
      { avatarURL: `/avatars/${filename}` },
      { new: true }
    );

    res.json({ avatarURL: user.avatarURL });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  updateAvatar,
};
