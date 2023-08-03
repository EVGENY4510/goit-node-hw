const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { program } = require("commander");

program

  .option("-a, --action <action>", "choose action")

  .option("-i, --id <id>", "user id")

  .option("-n, --name <name>", "user name")

  .option("-e, --email <email>", "user email")

  .option("-p, --phone <phone>", "user phone");

program.parse(process.argv);

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log(contacts);
      return;

    case "get":
      const contact = await getContactById(id);
      console.log(contact);
      return;

    case "add":
      const newContact = await addContact({ name, email, phone });
      console.log(newContact);
      return;

    case "remove":
      const removedContact = await removeContact(id);
      console.log(removedContact);
      return;

    default:
      console.warn("Unknown action type!");
  }
}

invokeAction(options).catch((err) => console.error(err));
