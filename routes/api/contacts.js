const express = require("express");
const Joi = require("joi");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("./index");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.delete("/:contactId", removeContact);

router.post("/", (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing required name field" });
  }
  addContact(req, res);
});

router.put("/:contactId", (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing fields" });
  }
  updateContact(req, res);
});

module.exports = router;
