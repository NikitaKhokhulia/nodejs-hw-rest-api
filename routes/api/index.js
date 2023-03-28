const Contact = require("./contactModel");

async function listContacts(req, res) {
  const contacts = await Contact.find({});
  res.status(200).json({ contacts });
}

async function getContactById(req, res) {
  const id = req.params.contactId;
  console.log(id);
  const contact = await Contact.findById(id);

  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not Found" });
  }
}

async function addContact(req, res) {
  const { name, email, phone } = req.body;

  const newContact = await Contact.create({ name, email, phone });
  res.status(201).json(newContact);
}

async function removeContact(req, res) {
  const id = req.params.contactId;
  const result = await Contact.deleteOne({ _id: id });

  if (result.deletedCount === 1) {
    res.status(200).json({ message: "Contact deleted successfully" });
  } else {
    res.status(404).json({ message: "not found" });
  }
}

async function updateContact(req, res) {
  const id = req.params.contactId;
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const contact = await Contact.findByIdAndUpdate(
    id,
    { name, email, phone },
    { new: true }
  );

  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not Found" });
  }
}

async function updateContactStatus(req, res) {
  const id = req.params.contactId;
  const { favorite } = req.body;

  if (typeof favorite !== "boolean") {
    return res
      .status(400)
      .json({ message: "missing field favorite or invalid type" });
  }
  const contact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "not Found" });
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
};
