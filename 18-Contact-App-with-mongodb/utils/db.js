const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/mahasiswa", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

//* membuat Schema

// //* Menambahkan 1 Data
// const contact1 = new contact({ nama: "Galih Ginanajar", nohp: "08123456789", email: "GGalih@gmail.com" });

// //* Simpan
// contact1
//   .save()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
