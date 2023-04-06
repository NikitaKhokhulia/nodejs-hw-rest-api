const bcrypt = require("bcrypt");
const Joi = require("joi");
const User = require("../user/userModel");

const registrationSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
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

    if (!req.body.email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPassword,
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

module.exports = {
  registerUser,
};
