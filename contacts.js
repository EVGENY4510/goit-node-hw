const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function read() {
  const data = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(data);
}

function write(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data));
}

async function listContacts() {
  const data = await read();

  return data;
}

async function getContactById(id) {
  const data = await read();

  return data.find((contact) => contact.id === id);
}

async function removeContact(id) {
  const data = await read();

  const index = data.findIndex((contact) => contact.id == id);

  if (index === -1) {
    return null;
  }
  const newContact = [...data.slice(0, index), ...data.slice(index + 1)];

  await write(newContact);

  return data[index];
}

async function addContact(contact) {
  const data = await read();

  const newContact = { ...contact, id: crypto.randomUUID() };

  data.push(newContact);

  await write(data);

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
