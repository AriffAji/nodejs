//? Require
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts } = require("./utils/contacts");
const { body, validationResult, check } = require("express-validator");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

//? configure flash
app.use(cookieParser("secret"));
app.use(session({ cookie: { maxAge: 6000 }, secret: "secret", resave: true, saveUninitialized: true }));
app.use(flash());

//?
const port = 8000;
app.set("view engine", "ejs");
app.use(expressLayouts); // third-party Middleware
app.use(express.static("public")); // built-in Middleware
app.use(express.urlencoded({ extended: true })); // built-in Middleware

//? Routing
app.get("/", (req, res) => {
  // res.sendFile("./index.html", { root: __dirname });
  const mahasiswa = [
    { nama: "Arif Aji", email: "arif@poliwangi.com" },
    { nama: "Arif", email: "arif1@poliwangi.com" },
  ];
  res.render("index", { nama: "ArifAji!", mahasiswa, title: "Halaman Index", layout: "layouts/main-layouts" });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
    layout: "layouts/main-layouts",
  });
});

app.get("/contact", (req, res) => {
  const contacts = loadContact();
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

//* Proses data contact
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
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
      // return res.status(400).json({ errors: errors.array() });
      res.render("add-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main-layouts",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      //* mengirimkan flash message
      req.flash("msg", "Data Kontak berhasil Ditambahkan");
      res.redirect("/contact");
    }
  }
);

//* Delete Contact
app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  //! jika kontak tidak ada
  if (!contact) {
    res.status(404);
    res.send("<h1>404</h1>");
  } else {
    deleteContact(req.params.nama);
    req.flash("msg", "Data Contact Berhasil dihapus!");
    res.redirect("/contact");
  }
});

//* Ubah data contact
app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("edit-contact", {
    title: "Form Ubah Data Contact",
    layout: "layouts/main-layouts",
    contact,
  });
});

//* Proses Ubah data
app.post(
  "/contact/update",
  [
    body("nama").custom((value, { req }) => {
      const duplikat = cekDuplikat(value);
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
      // return res.status(400).json({ errors: errors.array() });
      res.render("edit-contact", {
        title: "Form Ubah Data Contact",
        layout: "layouts/main-layouts",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      updateContacts(req.body);
      //* mengirimkan flash message
      req.flash("msg", "Data Kontak berhasil Diubah");
      res.redirect("/contact");
    }
  }
);

//* Halaman detail
app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("detail", {
    title: "Halaman Detail Contact",
    layout: "layouts/main-layouts",
    contact,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("404");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
