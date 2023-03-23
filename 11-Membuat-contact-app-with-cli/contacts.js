// * Import Required
const fs = require("node:fs");
const validator = require("validator");
const chalk = require("chalk");
// * Import Required

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

const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanContacts = (nama, email, noHp) => {
  const contact = { nama, email, noHp };
  const contacts = loadContact();

  //? cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("email tidak valid!"));
      return false;
    }
  }
  //? cek email

  //? cek noHP
  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(chalk.red.inverse.bold("No Hp anda tidak valid!"));
    return false;
  }
  //? cek noHP

  //? Cek Duplikasi
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(chalk.red.inverse.bold("Contact Sudah Tedaftar"));
    return false;
  }
  //? Cek Duplikasi
  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log(chalk.green.inverse.bold(`Terimakasih ${nama}`));
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.blueBright.inverse.bold(`Daftar Contacts : `));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  console.log(chalk.blueBright.inverse.bold("Nama Yang dicari : "));
  console.log("Nama : " + contact.nama);
  console.log("No Hp : " + contact.noHp);
  if (contact.email) {
    console.log("Email : " + contact.email);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }
  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));
  console.log(chalk.green.inverse.bold(`Data ${nama} Berhasil di hapus`));
};

module.exports = {
  deleteContact,
  detailContact,
  listContact,
  simpanContacts,
};
