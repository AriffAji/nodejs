const yargs = require("yargs");
const contacts = require("./contacts");

yargs
  .command({
    command: "add",
    describe: "Menambahkan Contact baru",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "email anda",
        demandOption: false,
        type: "string",
      },
      noHp: {
        describe: "No HP anda",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contacts.simpanContacts(argv.nama, argv.email, argv.noHp);
    },
  })
  .demandCommand();

//? Fitur manmpilkan daftar semua contact
yargs.command({
  command: "list",
  describe: "Menampilkan semua nama & no Hp contact ",
  handler() {
    contacts.listContact();
  },
});
//? Fitur manmpilkan daftar semua contact

//? Menampilkan Detail Contact
yargs.command({
  command: "detail",
  describe: "Menampilkan detail nama & no Hp contact berdasarkan nama ",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama);
  },
});
//? Menampilkan Detail Contact

//? Menghapus Contacts
yargs.command({
  command: "delete",
  describe: "Menghapus Contacts ",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.nama);
  },
});
//? Menghapus Contacts

yargs.parse();
