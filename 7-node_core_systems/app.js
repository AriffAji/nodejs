const fs = require("node:fs");

//? menuliskan modul sync
// fs.writeFileSync("test.txt", "Hello World secara synchronus!");

//? menuliskan secara Async
// fs.writeFile("test.txt", "Hello World secara Asynchronus!", (e) => {
//   console.log(e);
// });

//? membaca isi file secara sync
// console.log(fs.readFileSync("test.txt", "utf-8"));

//? membaca secara async
// fs.readFile("data/test.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

//! Readline
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({ input, output });

// rl.question("Maasukkan Namamu :  ", (nama) => {
//   rl.question("Maasukkan Namamu :  ", (noHp) => {
//     console.log(`Terimakasih: ${nama} sudah menginputkan ${noHp}`);
//     rl.close();
//   });
// });

rl.question("Maasukkan Namamu :  ", (nama) => {
  rl.question("Maasukkan Namamu :  ", (noHp) => {
    const contact = { nama, noHp };
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    const contacts = JSON.parse(file);

    contacts.push(contact);
    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
    console.log(`Terimakasih ${nama}`);

    rl.close();
  });
});
