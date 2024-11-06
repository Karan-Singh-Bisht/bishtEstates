const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

const db = require("./config/db");
db();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const bodyParser = require("body-parser"); //For parsing json body
app.use(bodyParser.json());

//Routes

const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
