const express = require("express");
const app = express();
require("dotenv").config();

const db = require("./config/db");
db();

//Routes

const userRoute = require("./routes/user.route");

app.use("/api/user", userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
