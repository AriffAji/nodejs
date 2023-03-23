const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.sendFile("./index.html", { root: __dirname });
});
app.get("/about", (req, res) => {
  res.sendFile("./About.html", { root: __dirname });
});
app.get("/contact", (req, res) => {
  res.sendFile("./contact.html", { root: __dirname });
});
app.get("/product/:id", (req, res) => {
  res.send("Product ID : " + req.params.id);
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("404");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
