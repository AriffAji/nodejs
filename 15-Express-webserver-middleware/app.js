const express = require("express");
var expressLayouts = require("express-ejs-layouts");
var morgan = require("morgan");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

// third-party Middleware
app.use(expressLayouts);
app.use(morgan("dev"));

// built-in Middleware
app.use(express.static("public"));

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
  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layouts",
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("404");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
