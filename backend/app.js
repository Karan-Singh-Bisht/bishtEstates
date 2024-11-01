const express = require("express");
const app = express();
require("dotenv").config();

const db = require("./config/db");
db();

app.get("/", (req, res) => {
  res.send("Hello, Bisht Estate!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
