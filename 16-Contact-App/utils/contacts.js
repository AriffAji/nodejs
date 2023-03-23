const fs = require("fs");

//? Membuat file data
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//? membuat file json
const filePath = "./data/contacts.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

//? Ambil semuua data di contact.json
const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

//? cari contact berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
  return contact;
};

//? menuliskan file contacts json
const saveContacts = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

//? menambahkan data contact baru
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

//? cek duplikat nama
const cekDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama === nama);
};

//? Hpus contact
const deleteContact = (nama) => {
  const contacts = loadContact();
  const filteredContact = contacts.filter((contact) => contact.nama !== nama);
  saveContacts(filteredContact);
};

//? Update Contacts
updateContacts = (contactBaru) => {
  const contacts = loadContact();

  //* hilangkan contact lama yang namanya sama dngan oldname
  const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama);
  delete contactBaru.oldNama;
  filteredContacts.push(contactBaru);
  saveContacts(filteredContacts);
};

module.exports = { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts };
