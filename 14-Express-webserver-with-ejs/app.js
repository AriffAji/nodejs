const express = require("express");
var expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);

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
