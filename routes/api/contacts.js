const express = require("express");
const Joi = require("joi");
const authMiddleware = require("../../Middleware/authMiddleware");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus,
} = require("./postService");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
});

router.get("/", authMiddleware, listContacts);

router.get("/:contactId", authMiddleware, getContactById);

router.delete("/:contactId", authMiddleware, removeContact);

router.post("/", authMiddleware, (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing required name field" });
  }
  if (!req.body.favorite) {
    req.body.favorite = false;
  }
  addContact(req, res);
});

router.put("/:contactId", authMiddleware, (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing fields" });
  }
  updateContact(req, res);
});

router.patch("/:contactId/favorite", authMiddleware, (req, res) => {
  const { error } = Joi.object({ favorite: Joi.boolean().required() }).validate(
    req.body
  );
  if (error) {
    return res
      .status(400)
      .json({ message: "missing field favorite or invalid type" });
  }
  updateContactStatus(req, res);
});

module.exports = router;
