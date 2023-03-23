const express = require("express");
const expressLayouts = require("express-ejs-layouts");
require("./utils/db");
const Contact = require("./model/contact");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const findOne = require("./model/contact");
const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");
const { updateOne } = require("./model/contact");

//* Port
const app = express();
const port = 3000;

//* Running Port
app.listen(port, () => {
  console.log(`Mongo Contact App | Listening at http://localhost:${port}`);
});

//? Konfigurasu Method Override
app.use(methodOverride("_method"));

//? konfigurasi ejs
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//? configure flash
app.use(cookieParser("secret"));
app.use(session({ cookie: { maxAge: 6000 }, secret: "secret", resave: true, saveUninitialized: true }));
app.use(flash());

//? Routing

//* Index
app.get("/", (req, res) => {
  // res.sendFile("./index.html", { root: __dirname });
  const mahasiswa = [
    { nama: "Arif Aji", email: "arif@poliwangi.com" },
    { nama: "Arif", email: "arif1@poliwangi.com" },
  ];
  res.render("index", { nama: "ArifAji!", mahasiswa, title: "Halaman Index", layout: "layouts/main-layouts" });
});

//* About
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
    layout: "layouts/main-layouts",
  });
});

//* Contact
app.get("/contact", async (req, res) => {
  const contacts = await Contact.find();
  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layouts",
    contacts,
    msg: req.flash("msg"),
  });
});

//* Halaman form tambah data contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form tambah Data Contact",
    layout: "layouts/main-layouts",
  });
});

//* Proses Tambah data contact
app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (duplikat) {
        throw new Error("Nama Sudah terdaftar");
      }
      return true;
    }),
    check("email", "Email tidak Valid").isEmail(),
    check("nohp", "No HP tidak Valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main-layouts",
        errors: errors.array(),
      });
    } else {
      Contact.insertMany(req.body, (err, result) => {
        //* mengirimkan flash message
        req.flash("msg", "Data Kontak berhasil Ditambahkan");
        res.redirect("/contact");
      });
    }
  }
);

//* Delete
// app.get("/contact/delete/:nama", async (req, res) => {
//   const contact = await Contact.findOne({ nama: req.params.nama });
//   //! jika kontak tidak ada
//   if (!contact) {
//     res.status(404);
//     res.send("<h1>404</h1>");
//   } else {
//     // Contact.deleteOne({ nama: req.params.nama });
//     Contact.deleteOne({ _id: contact._id }).then((result) => {
//       req.flash("msg", "Data Contact Berhasil dihapus!");
//       res.redirect("/contact");
//     });
//   }
// });
app.delete("/contact", (req, res) => {
  Contact.deleteOne({ nama: req.body.nama }).then((result) => {
    req.flash("msg", "Data Contact Berhasil dihapus!");
    res.redirect("/contact");
  });
});

//* Halaman Form Edit Data
app.get("/contact/edit/:nama", (req, res) => {
  const contact = Contact.findOne({ nama: req.params.nama });
  res.render("edit-contact", {
    title: "Form Ubah Data Contact",
    layout: "layouts/main-layouts",
    contact,
  });
});

//* Proses Ubah data
app.put(
  "/contact",
  [
    body("nama").custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama Sudah terdaftar");
      }
      return true;
    }),
    check("email", "Email tidak Valid").isEmail(),
    check("nohp", "No HP tidak Valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "Form Ubah Data Contact",
        layout: "layouts/main-layouts",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            nohp: req.body.nohp,
          },
        }
      ).then((result) => {
        //* mengirimkan flash message
        req.flash("msg", "Data Kontak berhasil Diubah");
        res.redirect("/contact");
      });
      // Contact.updateOne({ nama: req.body.nama });
    }
  }
);

//* Detail
app.get("/contact/:nama", async (req, res) => {
  // const contact = findContact(req.params.nama);
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render("detail", {
    title: "Halaman Detail Contact",
    layout: "layouts/main-layouts",
    contact,
  });
});
