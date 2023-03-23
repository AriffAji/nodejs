const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const dbName = "mahasiswa";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (error) {
    return console.log("Koneksi gagal");
  }
  // pilih database
  const db = client.db(dbName);

  //* menambahkan data ke collection mahasiswa
  // db.collection("namaMahasiswa").insertOne(
  //   {
  //     nama: "Erik",
  //     email: "erik@gmail.com",
  //   },
  //   (error, result) => {
  //     if (error) {
  //       return console.log("Gagal menambahkan Data!");
  //     }
  //     console.log(result);
  //   }
  // );

  //* menambahkan lebih dari satu data
  // db.collection("mahasiswa").insertMany(
  //   [
  //     {
  //       nama: "Erik",
  //       email: "erik@yahoo.com",
  //     },
  //     {
  //       nama: "Avip",
  //       email: "avip@yahoo.com",
  //     },
  //   ],
  //   (error, result) => {
  //     if (error) {
  //       return console.log("Data Gagal Ditambahkan!");
  //     }
  //     console.log(result);
  //   }
  // );

  //* Menampilkan semua data yang di collection
  // console.log(
  //   db
  //     .collection("namaMahasiswa")
  //     .find()
  //     .toArray((error, result) => {
  //       console.log(result);
  //     })
  // );

  //* Menampilkan data berdasarkan kriteria
  // console.log(
  //   db
  //     .collection("mahasiswa")
  //     .find({ _id: ObjectID("641a88e2ef020f53e4f51d83") })
  //     .toArray((error, result) => {
  //       console.log(result);
  //     })
  // );

  //* Mengubah data
  // const updatePromises = db.collection("mahasiswa").updateOne({ nama: "Avip Ramadhan" }, { $set: { nama: "Avip Ukki Ramadhan" } });
  // updatePromises
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  //* mengubah lebih dari satu data
  // const updatePromises = db.collection("mahasiswa").updateMany({ nama: "Erik" }, { $set: { nama: "Erik tiktok" } });
  // updatePromises
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  //* menghapus 1 data
  // db.collection("mahasiswa")
  //   .deleteOne({ nama: "Avip Ukki Ramadhan" })
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  //* delete banyak data
  db.collection("mahasiswa")
    .deleteMany({ nama: "Erik tiktok" })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
