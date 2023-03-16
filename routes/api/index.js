const fs = require("fs");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "../../db/contacts.json");

function listContacts(req, res) {
  const contacts = JSON.parse(fs.readFileSync(contactsPath, "utf8"));
  res.status(200).json(contacts);
}

function getContactById(req, res) {
  const contacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
  const id = req.params.contactId;
  const contact = contacts.find((c) => c.id === id);

  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not Found" });
  }
}

function addContact(req, res) {
  const contacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
  const { name, email, phone } = req.body;

  const id = shortid();
  const newContact = { id, name, email, phone };
  contacts.push(newContact);

  fs.writeFileSync(contactsPath, JSON.stringify(contacts));
  res.status(201).json(newContact);
}

function removeContact(req, res) {
  const contacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
  const id = req.params.contactId;
  const index = contacts.findIndex((c) => c.id === id);

  if (index !== -1) {
    contacts.splice(index, 1);
    fs.writeFileSync(contactsPath, JSON.stringify(contacts));
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
}

function updateContact(req, res) {
  const contacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));

  const id = req.params.contactId;
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const index = contacts.findIndex((c) => c.id === id);

  if (index !== -1) {
    contacts[index].name = name || contacts[index].name;
    contacts[index].email = email || contacts[index].email;
    contacts[index].phone = phone || contacts[index].phone;

    fs.writeFileSync(contactsPath, JSON.stringify(contacts));
    res.status(200).json(contacts[index]);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
